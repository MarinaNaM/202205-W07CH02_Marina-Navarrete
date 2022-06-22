import { Router } from 'express';
import {
    addThings,
    deleteThing,
    getAllController,
    getController,
    updateThings,
} from '../controller/things.controller.js';

export const thingRouter = Router();

thingRouter.get('/', getAllController);
thingRouter.get('/:id', getController);
thingRouter.post('/', addThings);
thingRouter.patch('/:id', updateThings);
thingRouter.delete('/:id', deleteThing);
