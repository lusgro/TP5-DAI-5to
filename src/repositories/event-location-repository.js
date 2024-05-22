import config from '../configs/dbConfig.js'
import pkg from 'pg';
const { Pool } = pkg;

export default class EventLocationRepository {
    constructor() {
        this.pool = new Pool(config);
    }

    async getAllAsync() {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT el.id, el.name, el.full_address, el.max_capacity, el.latitude, el.longitude, 
                json_build_object(
                    'id', l.id,
                    'name' , l.name,
                    'longitude', l.longitude,
                    'latitude', l.latitude,
                    'province', json_build_object(
                        'id', p.id, 
                        'name', p.name, 
                        'full_name', p.full_name,
                        'latitude', p.latitude,
                        'longitude', p.longitude,
                        'display_order', p.display_order
                    )
                ) AS location,
                json_build_object(
                    'id', u.id, 
                    'first_name', u.first_name, 
                    'last_name', u.last_name, 
                    'username', u.username
                ) AS creator_user
                FROM event_locations el
                INNER JOIN locations l ON el.id_location = l.id
                INNER JOIN provinces p ON l.id_province = p.id
                INNER JOIN users u ON el.id_creator_user = u.id`,
            );

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
        } catch (error) {
            console.error(error);
        } finally {
            client.release();
        }
    }

    async getByIdAsync(id) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT el.id, el.name, el.full_address, el.max_capacity, el.latitude, el.longitude, 
                json_build_object(
                    'id', l.id,
                    'name' , l.name,
                    'longitude', l.longitude,
                    'latitude', l.latitude,
                    'province', json_build_object(
                        'id', p.id, 
                        'name', p.name, 
                        'full_name', p.full_name,
                        'latitude', p.latitude,
                        'longitude', p.longitude,
                        'display_order', p.display_order
                    )
                ) AS location,
                json_build_object(
                    'id', u.id, 
                    'first_name', u.first_name, 
                    'last_name', u.last_name, 
                    'username', u.username
                ) AS creator_user
                FROM event_locations el
                INNER JOIN locations l ON el.id_location = l.id
                INNER JOIN provinces p ON l.id_province = p.id
                INNER JOIN users u ON el.id_creator_user = u.id 
                WHERE el.id = $1`,
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
        } finally {
            client.release();
        }
    }
    
    async getByProvinceAsync(id) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT el.id, el.name, el.full_address, el.max_capacity, el.latitude, el.longitude, 
                json_build_object(
                    'id', l.id,
                    'name' , l.name,
                    'longitude', l.longitude,
                    'latitude', l.latitude,
                    'province', json_build_object(
                        'id', p.id, 
                        'name', p.name, 
                        'full_name', p.full_name,
                        'latitude', p.latitude,
                        'longitude', p.longitude,
                        'display_order', p.display_order
                    )
                ) AS location,
                json_build_object(
                    'id', u.id, 
                    'first_name', u.first_name, 
                    'last_name', u.last_name, 
                    'username', u.username
                ) AS creator_user
                FROM event_locations el
                INNER JOIN locations l ON el.id_location = l.id
                INNER JOIN provinces p ON l.id_province = p.id
                INNER JOIN users u ON el.id_creator_user = u.id
                WHERE p.id = $1`,
                [id]
            );
            return result.rows;
        } catch (error) {
            console.error(error);
        } finally {
            client.release();
        }
    }

    async getByLocationAsync (id) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT el.id, el.name, el.full_address, el.max_capacity, el.latitude, el.longitude, 
                json_build_object(
                    'id', l.id,
                    'name' , l.name,
                    'longitude', l.longitude,
                    'latitude', l.latitude,
                    'province', json_build_object(
                        'id', p.id, 
                        'name', p.name, 
                        'full_name', p.full_name,
                        'latitude', p.latitude,
                        'longitude', p.longitude,
                        'display_order', p.display_order
                    )
                ) AS location,
                json_build_object(
                    'id', u.id, 
                    'first_name', u.first_name, 
                    'last_name', u.last_name, 
                    'username', u.username
                ) AS creator_user
                FROM event_locations el
                INNER JOIN locations l ON el.id_location = l.id
                INNER JOIN provinces p ON l.id_province = p.id
                INNER JOIN users u ON el.id_creator_user = u.id
                WHERE l.id = $1`,
                [id]
            );
            return result.rows;
        }
        catch (error) {
            console.error(error);
        } finally {
            client.release();
        }
    }
}