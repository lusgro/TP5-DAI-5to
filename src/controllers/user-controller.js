import { Router } from 'express';
import UserService from '../services/user-service.js';
import { getString } from '../helpers/validaciones-helper.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const UserController = Router();
const userService = new UserService();

UserController.post('/login', async (req, res) => {
    const username = getString(req.body.username);
    const password = getString(req.body.password);
    const result = await userService.login(username, password);
    if (result) {
        const token = jwt.sign({ id: result.id, username: result.username}, process.env.SECRET_KEY, { expiresIn: '1h', issuer: 'yo' });
        res.status(201).json({"success": true, "token": token})
    }
    else {
        res.status(404).send('Usuario no encontrado');
    }
});

UserController.post('/register', async (req, res) => {
    const username = getString(req.body.username);
    const password = getString(req.body.password);
    const firstName = getString(req.body.first_name);
    const lastName = getString(req.body.last_name);
    const result = await userService.register(username, password, firstName, lastName);
    if (result) {
        res.status(201).send('Usuario registrado');
    }
    else {
        res.status(500).send('Error interno');
    }
});

export default UserController;