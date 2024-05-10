import config from '../configs/dbConfig.js'
import pkg from 'pg';
const { Pool } = pkg;

export default class EventRepository {
    constructor() {
        this.pool = new Pool(config);
    }

    async getAllEvents() {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, 
                el.id AS event_location_id, el.name AS event_location_name, el.full_address AS event_location_full_address, el.latitude AS event_location_latitude, 
                el.longitude AS event_location_longitude, el.max_capacity AS event_location_max_capacity, l.*,
                p.*, u.id, u.first_name, u.last_name, u.username, t.*
                FROM events e
                INNER JOIN event_locations el ON e.id_event_location = el.id
                INNER JOIN locations l ON el.id_location = l.id
                INNER JOIN provinces p ON l.id_province = p.id
                INNER JOIN users u ON e.id_creator_user = u.id
                INNER JOIN events_tags et ON e.id = et.id_event
                INNER JOIN tags t ON et.id_tag = t.id`);
            return result.rows;
        }
        catch (error) {
            console.error(error);
            return null;
        }
        finally {
            client.release();
        }
    }
    async getById(id) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT e.*, el.*, l.* 
                FROM events e 
                INNER JOIN event_locations el ON e.id_event_location = el.id 
                INNER JOIN locations l ON el.id_location = l.id 
                WHERE e.id = $1`, [id]);
            return result.rows[0];
        }
        catch (error) {
            console.error(error);
            return null;
        }
        finally {
            client.release();
        }
    }
    async getFilteredEvent(name, category, start_date, tag) {
        const client = await this.pool.connect();
        let query = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, 
        el.id AS event_location_id, el.name AS event_location_name, el.full_address AS event_location_full_address, el.latitude AS event_location_latitude, 
        el.longitude AS event_location_longitude, el.max_capacity AS event_location_max_capacity, l.*,
        p.*, u.id, u.first_name, u.last_name, u.username, t.*
        FROM events e
        INNER JOIN event_locations el ON e.id_event_location = el.id
        INNER JOIN locations l ON el.id_location = l.id
        INNER JOIN provinces p ON l.id_province = p.id
        INNER JOIN users u ON e.id_creator_user = u.id
        INNER JOIN events_tags et ON e.id = et.id_event
        INNER JOIN tags t ON et.id_tag = t.id
        INNER JOIN event_categories ec ON e.id_event_category = ec.id`
        const values = [];
        let countParams = 0;
        if (name || category || start_date || tag) {
            query += ' WHERE 1 = 1';
        }
        if (name) {
            query += ` AND e.name = $${++countParams}`;
            values.push(name);
            countParams++;
        }
        if (category) {
            query += ` AND ec.name = $${++countParams}`;
            values.push(category);
            countParams++;
        }
        if (start_date) {
            query += ` AND e.start_date = $${++countParams}`;
            values.push(start_date);
            countParams++;
        }
        if (tag) {
            query += ` AND t.name = $${++countParams}`;
            values.push(tag);
            countParams++;
        }

        try {
            const result = await client.query(query, values);
            return result.rows;
        }
        catch (error) {
            console.error(error);
            return null;
        }
        finally {
            client.release();
        }
    }
    async getEnrollments(id, firstName, lastName, username, attended, rating) {
        const client = await this.pool.connect();
        let query = 'SELECT u.id, u.first_name, u.last_name, u.username FROM users u INNER JOIN events_enrollments ee ON u.id = ee.userid WHERE ee.event_id = $1';
        const values = [id];
        let countParams = 1;
        if (firstName) {
            query += ` AND u.first_name = $${++countParams}`;
            values.push(firstName);
            countParams++;
        }
        if (lastName) {
            query += ` AND u.last_name = $${++countParams}`;
            values.push(lastName);
            countParams++;
        }
        if (username) {
            query += ` AND u.username = $${++countParams}`;
            values.push(username);
            countParams++;
        }
        if (attended !== null) {
            query += ` AND ee.attended = $${++countParams}`;
            values.push(attended);
            countParams++;
        }
        if (rating) {
            query += ` AND ee.rating = $${++countParams}`;
            values.push(rating);
            countParams++;
        }
        
        try {
            const result = await client.query(query, values);
            return result.rows;
        }
        catch (error) {
            console.error(error);
            return null;
        }
        finally {
            client.release();
        }
    }
}