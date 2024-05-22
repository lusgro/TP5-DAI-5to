import config from '../configs/dbConfig.js'
import pkg from 'pg';
const { Pool } = pkg;

export default class EventCategoryRepository {
    constructor() {
        this.pool = new Pool(config);
    }

    async getAllAsync() {
        const client = await this.pool.connect();
        try {
            const result = await client.query('SELECT * FROM event_categories');
            return result.rows;
        } catch (error) {
            console.error(error);
            return null;
        }
        finally {
            client.release();
        }
    }

    async getByIdAsync(id) {
        const client = await this.pool.connect();
        try {
            const result = await client.query('SELECT * FROM event_categories WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            client.release();
        }
    }

    async createAsync(entity) {
        const client = await this.pool.connect();
        try {
            await client.query('INSERT INTO event_categories (name, display_order) VALUES ($1, $2)', [entity.name, entity.display_order]);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            client.release();
        }
    }
    
    async updateAsync(entity) {
        const client = await this.pool.connect();
        try {
            await client.query('UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3', [entity.name, entity.display_order, entity.id]);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            client.release();
        }
    }

    async deleteAsync(id) {
        const client = await this.pool.connect();
        try {
            await client.query('DELETE FROM event_categories WHERE id = $1', [id]);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            client.release();
        }
    }
}