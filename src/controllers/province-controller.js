import { Router } from 'express';
import ProvinceService from '../services/province-service.js';
import { getInteger } from '../helpers/validaciones-helper.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ProvinceController = Router();
const provinceService = new ProvinceService();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        next();
    });
};

ProvinceController.use(verifyToken);

ProvinceController.get('/', async (req, res) => {
    let respuesta;
    const returnArray = await provinceService.getAllAsync();
    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    } else {
        respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
});

ProvinceController.get('/:id', async (req, res) => {
    const id = getInteger(req.params.id);
    const result = await provinceService.getByIdAsync(id);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send('Provincia no encontrada');
    }
});

ProvinceController.post('/', async (req, res) => {
    const result = await provinceService.createAsync(req.body);
    if (result) {
        res.status(201).send();
    }
    else {
        res.status(500).send('Error en las reglas del negocio');
    }
});

ProvinceController.put('/', async (req, res) => {
    const id = getInteger(req.body.id);
    if (id === null) {
        res.status(400).send('El id de provincia debe ser un número entero');
        return;
    }
    else {
        const province = await provinceService.getByIdAsync(id);
        if (province) {
            const result = await provinceService.updateAsync(req.body);
            if (result) {
                res.status(200).send();
            }
            else {
                res.status(400).send('Error en las reglas del negocio');
            }
        }
        else {
            res.status(404).send();
        }
    }
});

ProvinceController.delete('/:id', async (req, res) => {
    const id = getInteger(req.params.id);
    if (id === null) {
        res.status(400).send('El id de provincia debe ser un número entero');
        return;
    }
    else {
        const province = await provinceService.getByIdAsync(id);
        if (province) {
            await provinceService.deleteAsync(id);
            res.status(200).send();
        }
        else {
            res.status(404).send();
        }
    }
});

export default ProvinceController;