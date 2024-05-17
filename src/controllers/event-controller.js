import { Router } from 'express';
import EventService from '../services/event-service.js';
import { getString, getInteger, getBoolean, getDate } from '../helpers/validaciones-helper.js';
import jwt from 'jsonwebtoken';

const EventController = Router();
const eventService = new EventService();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

EventController.get('/', async (req, res) => {
    let result;
    if (req.query === undefined || Object.keys(req.query).length === 0) {
        result = await eventService.getAllEvents();
    }
    else {
        const name = getString(req.query.name);
        const category = getString(req.query.category);
        const startDate = getDate(req.query.start_date);
        const tag = getString(req.query.tag);
        result = await eventService.getFilteredEvent(name, category, startDate, tag);
        if (!result) {
            res.status(404).send('No se encontraron eventos que cumplan con los criterios de búsqueda');
            return;
        }
    }
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(500).send('Error interno');
    }
});

EventController.get('/:id', async (req, res) => {
    const id = getInteger(req.params.id);
    const result = await eventService.getById(id);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send('Evento no encontrado');
    }
});

EventController.get('/:id/enrollment', async (req, res) => {
    const id = getInteger(req.params.id);
    if (id === null) {
        res.status(400).send('El id de evento debe ser un número entero');
        return;
    }
    const firstName = getString(req.query.first_name);
    const lastName = getString(req.query.last_name);
    const username = getString(req.query.username);
    const attended = getBoolean(req.query.attended);
    const rating = getInteger(req.query.rating);
    const result = await eventService.getEnrollments(id, firstName, lastName, username, attended, rating);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send('No se encontraron inscripciones que cumplan con los criterios de búsqueda');
    }
});

EventController.post('/', verifyToken, async (req, res) => {
    const result = await eventService.createAsync(req.body, req.user.id);
    if (result) {
        res.status(201).send();
    }
    else {
        res.status(500).send('Error en las reglas del negocio');
    }
});

EventController.put('/', verifyToken, async (req, res) => {
    const result = await eventService.updateAsync(req.body, req.user.id);
    if (result) {
        res.status(200).send();
    }
    else {
        res.status(400).send('Error en las reglas del negocio');
    }
});

EventController.delete('/:id', verifyToken, async (req, res) => {
    const id = getInteger(req.params.id);
    if (id === null) {
        res.status(400).send('El id de evento debe ser un número entero');
        return;
    }
    const result = await eventService.deleteAsync(id, req.user.id);
    if (result) {
        res.status(200).send();
    }
    else {
        res.status(400).send('Error en las reglas del negocio');
    }
});

export default EventController;