import { Router } from 'express';
import {
    addThings,
    deleteThing,
    getController,
    getThing,
    updateThings,
} from '../controller/things.controller.js';

export const thingRouter = Router();

thingRouter.get('/', getController);
thingRouter.get('/:id', getThing);
thingRouter.post('/', addThings);
thingRouter.patch('/:id', updateThings);
thingRouter.delete('/:id', deleteThing);
