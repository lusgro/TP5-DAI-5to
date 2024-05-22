import config from "../configs/dbConfig.js";
import pkg from "pg";
const { Pool } = pkg;

export default class ProvinceRepository {
    constructor() {
        this.pool = new Pool(config);
    }

    async getAllAsync() {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT * FROM provinces`
            );
            return result.rows;
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
                `SELECT * FROM provinces WHERE id = $1`,
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
        } finally {
            client.release();
        }
    }

    async createAsync(entity) {
        const client = await this.pool.connect();
        try {
            await client.query(
                `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5)`,
                [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order]
            );
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
            await client.query(
                `UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 WHERE id = $6`,
                [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order, entity.id]
            );
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
            await client.query(
                `DELETE FROM provinces WHERE id = $1`,
                [id]
            );
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            client.release();
        }
    }
}