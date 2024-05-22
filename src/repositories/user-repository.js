import config from "../configs/dbConfig.js";
import pkg from "pg";
const { Pool } = pkg;

export default class UserRepository {
    constructor() {
        this.pool = new Pool(config);
    }

    async login(username, password) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT * FROM users WHERE username = $1 AND password = $2`,
                [username, password]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
        } finally {
            client.release();
        }
    }

    async register(username, password, firstName, lastName) {
        const client = await this.pool.connect();
        try {
            await client.query(
                `INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)`,
                [username, password, firstName, lastName]
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