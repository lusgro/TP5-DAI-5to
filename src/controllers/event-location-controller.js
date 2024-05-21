import { Router } from "express";
import EventLocationService from "../services/event-location-service.js";
import { getInteger } from "../helpers/validaciones-helper.js";
import jwt from "jsonwebtoken";

const EventLocationController = Router();
const eventLocationService = new EventLocationService();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.sendStatus(403);
        next();
    });
};

EventLocationController.use(verifyToken);

EventLocationController.get('/', async (req, res) => {
    const result = await eventLocationService.getAllAsync();
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(500).send('Error interno');
    }
});

EventLocationController.get('/:id', async (req, res) => {
    const id = getInteger(req.params.id);
    const result = await eventLocationService.getByIdAsync(id);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send();
    }
});

EventLocationController.get('/province/:id', async (req, res) => {
    const id = getInteger(req.params.id);
    const result = await eventLocationService.getByProvinceAsync(id);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send();
    }
});

EventLocationController.get('/location/:id', async (req, res) => {
    const id = getInteger(req.params.id);
    const result = await eventLocationService.getByLocationAsync(id);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send();
    }
});

export default EventLocationController;