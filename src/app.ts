import express from 'express';
import morgan from 'morgan';
import homeRouter from './router/home.js';
import { thingRouter } from './router/things.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/', homeRouter);
app.use('/thingsIKnow', thingRouter);
