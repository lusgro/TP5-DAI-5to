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
                json_build_object(
                    'id', el.id, 
                    'name', el.name, 
                    'full_address', el.full_address, 
                    'latitude', el.latitude, 
                    'longitude', el.longitude, 
                    'max_capacity', el.max_capacity,
                    'location', json_build_object(
                        'id', l.id, 
                        'name', l.name, 
                        'latitude', l.latitude, 
                        'longitude', l.longitude,
                        'province', json_build_object(
                            'id', p.id, 
                            'name', p.name, 
                            'full_name', p.full_name, 
                            'latitude', p.latitude, 
                            'longitude', p.longitude
                        )
                    )
                ) AS event_location,
                json_build_object(
                    'id', u.id, 
                    'first_name', u.first_name, 
                    'last_name', u.last_name, 
                    'username', u.username
                ) AS creator_user,
                json_agg(json_build_object('id', t.id, 'name', t.name)) AS tags
                FROM events e
                INNER JOIN event_locations el ON e.id_event_location = el.id
                INNER JOIN locations l ON el.id_location = l.id
                INNER JOIN provinces p ON l.id_province = p.id
                INNER JOIN users u ON e.id_creator_user = u.id
                INNER JOIN events_tags et ON e.id = et.id_event
                INNER JOIN tags t ON et.id_tag = t.id
                GROUP BY e.id, el.id, l.id, p.id, u.id`);
            
            const rows = result.rows;
            const response = {
                collection: rows,
                pagination: {
                    limit: 15,
                    offset: 0,
                    nextPage: null,
                    total: rows.length
                }
            };
            return response;
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
                `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, 
                json_build_object(
                    'id', el.id, 
                    'name', el.name, 
                    'full_address', el.full_address, 
                    'latitude', el.latitude, 
                    'longitude', el.longitude, 
                    'max_capacity', el.max_capacity,
                    'location', json_build_object(
                        'id', l.id, 
                        'name', l.name, 
                        'latitude', l.latitude, 
                        'longitude', l.longitude,
                        'province', json_build_object(
                            'id', p.id, 
                            'name', p.name, 
                            'full_name', p.full_name, 
                            'latitude', p.latitude, 
                            'longitude', p.longitude
                        )
                    )
                ) AS event_location,
                json_build_object(
                    'id', u.id, 
                    'first_name', u.first_name, 
                    'last_name', u.last_name, 
                    'username', u.username
                ) AS creator_user,
                json_agg(json_build_object('id', t.id, 'name', t.name)) AS tags
                FROM events e
                INNER JOIN event_locations el ON e.id_event_location = el.id
                INNER JOIN locations l ON el.id_location = l.id
                INNER JOIN provinces p ON l.id_province = p.id
                INNER JOIN users u ON e.id_creator_user = u.id
                INNER JOIN events_tags et ON e.id = et.id_event
                INNER JOIN tags t ON et.id_tag = t.id
                WHERE e.id = $1
                GROUP BY e.id, el.id, l.id, p.id, u.id`,
                [id]
            );
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
        json_build_object(
            'id', el.id, 
            'name', el.name, 
            'full_address', el.full_address, 
            'latitude', el.latitude, 
            'longitude', el.longitude, 
            'max_capacity', el.max_capacity,
            'location', json_build_object(
                'id', l.id, 
                'name', l.name, 
                'latitude', l.latitude, 
                'longitude', l.longitude,
                'province', json_build_object(
                    'id', p.id, 
                    'name', p.name, 
                    'full_name', p.full_name, 
                    'latitude', p.latitude, 
                    'longitude', p.longitude
                )
            )
        ) AS event_location,
        json_build_object(
            'id', u.id, 
            'first_name', u.first_name, 
            'last_name', u.last_name, 
            'username', u.username
        ) AS creator_user,
        json_agg(json_build_object('id', t.id, 'name', t.name)) AS tags
        FROM events e
        INNER JOIN event_locations el ON e.id_event_location = el.id
        INNER JOIN locations l ON el.id_location = l.id
        INNER JOIN provinces p ON l.id_province = p.id
        INNER JOIN users u ON e.id_creator_user = u.id
        INNER JOIN events_tags et ON e.id = et.id_event
        INNER JOIN tags t ON et.id_tag = t.id
        INNER JOIN event_categories ec ON e.id_event_category = ec.id`;
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
        query += ' GROUP BY e.id, el.id, l.id, p.id, u.id';
    
        try {
            const result = await client.query(query, values);
            const rows = result.rows;
            const response = {
                collection: rows,
                pagination: {
                    limit: 15,
                    offset: 0,
                    nextPage: null,
                    total: rows.length
                }
            };
            return response;
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
        let query = `SELECT json_build_object(
            'id', u.id, 
            'first_name', u.first_name, 
            'last_name', u.last_name, 
            'username', u.username
        ) AS user, ee.attended, ee.rating, ee.description
        FROM users u 
        INNER JOIN events_enrollments ee ON u.id = ee.id_user
        WHERE ee.id_event = $1`;
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
            const rows = result.rows;
            const response = {
                collection: rows,
                pagination: {
                    limit: 15,
                    offset: 0,
                    nextPage: null,
                    total: rows.length
                }
            };
            return response;
        }
        catch (error) {
            console.error(error);
            return null;
        }
        finally {
            client.release();
        }
    }

    async createAsync(entity, userId) {
        const client = await this.pool.connect();
        try {
            await client.query(
                `INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                [entity.name, entity.description, entity.id_event_category, entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment, entity.max_assistance, userId]
            );
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
        finally {
            client.release();
        }
    }

    async updateAsync(entity, userId) {
        const client = await this.pool.connect();
        try {
            const response = await client.query(
                `UPDATE events SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5, duration_in_minutes = $6, price = $7, enabled_for_enrollment = $8, max_assistance = $9
                WHERE id = $10 AND id_creator_user = $11`,
                [entity.name, entity.description, entity.id_event_category, entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment, entity.max_assistance, entity.id, userId]
            );
            return response.rowCount > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
        finally {
            client.release();
        }
    }

    async deleteAsync(id, userId) {
        const client = await this.pool.connect();
        try {
            const response = await client.query(
                `DELETE FROM events WHERE id = $1 AND id_creator_user = $2`,
                [id, userId]
            );
            return response.rowCount > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
        finally {
            client.release();
        }
    }
}