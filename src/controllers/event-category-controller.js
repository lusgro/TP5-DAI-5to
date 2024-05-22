import { Router } from 'express';
import EventCategoryService from '../services/event-category-service.js';
import { getInteger } from '../helpers/validaciones-helper.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const EventCategoryController = Router();
const eventCategoryService = new EventCategoryService();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        next();
    });
}

EventCategoryController.use(verifyToken);

EventCategoryController.get('/', async (req, res) => {
    const result = await eventCategoryService.getAllAsync();
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send();
    }
});

EventCategoryController.get('/:id', async (req, res) => {
    const id = getInteger(req.params.id);
    const result = await eventCategoryService.getByIdAsync(id);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send();
    }
});

EventCategoryController.post('/', async (req, res) => {
    const result = await eventCategoryService.createAsync(req.body);
    if (result) {
        res.status(201).send();
    } else {
        res.status(400).send('Error en las reglas de negocio');
    }
});

EventCategoryController.put('/', async (req, res) => {
    const id = getInteger(req.body.id);
    if (id === null) {
        res.status(400).send('El id de la categoría debe ser un número entero');
        return;
    }
    const getId = await eventCategoryService.getByIdAsync(id);
    if (getId) {
        const result = await eventCategoryService.updateAsync(req.body);
        if (result) {
            res.status(200).send();
        } else {
            res.status(400).send('Error en las reglas de negocio');
        }
    } else {
        res.status(404).send('Categoría no encontrada');
    }
});

EventCategoryController.delete('/:id', async (req, res) => {
    const id = getInteger(req.params.id);
    if (id === null) {
        res.status(400).send('El id de la categoría debe ser un número entero');
        return;
    }
    const result = await eventCategoryService.deleteAsync(id);
    if (result) {
        res.status(200).send();
    } else {
        res.status(404).send();
    }
});

export default EventCategoryController;