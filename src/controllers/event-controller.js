import { Router } from 'express';
import EventService from '../services/event-service.js';
import { getString, getInteger, getBoolean, getDate } from '../helpers/validaciones-helper.js';

const EventController = Router();
const eventService = new EventService();

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

export default EventController;