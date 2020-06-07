import express from 'express';
import knex from './database/connection';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import PointsControllers from './controllers/PointsControllers';
import ItemsControllers from './controllers/ItemsControllers';

const routes = express.Router();
const upload = multer(multerConfig);

// Item
routes.get('/items', ItemsControllers.index);

// Point
routes.post('/points', 
    upload.single('image'),
    celebrate({ 
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    PointsControllers.create
);
routes.get('/points', PointsControllers.index);
routes.get('/points/:id', PointsControllers.show);

export default routes;