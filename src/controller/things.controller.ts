import express from 'express';
import fs from 'fs/promises';

import { iThingsIKnow } from '../interface/thingsIKnow';

const dataFile = './data/db.json';

type dbThings = {
    thingsIKnow: Array<iThingsIKnow>;
};

export const getAllController = async (
    req: express.Request,
    resp: express.Response
) => {
    req;
    let things = await fs.readFile(dataFile, { encoding: 'utf-8' });
    console.log(JSON.parse(things));
    resp.setHeader('Content-type', 'text-html');
    resp.end(things);
};

export function getController(req: express.Request, resp: express.Response) {
    resp.setHeader('Content-type', 'application/json');
    fs.readFile(dataFile, { encoding: 'utf-8' }).then((things) => {
        const result = (JSON.parse(things) as dbThings).thingsIKnow.find(
            (thing) => thing.id === +req.params.id
        );
        if (result) {
            resp.end(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.end(JSON.stringify({}));
        }
    });
}

export function addThings(req: express.Request, resp: express.Response) {
    fs.readFile(dataFile, { encoding: 'utf-8' }).then((things) => {
        const parse = JSON.parse(things) as dbThings;
        const newThing = {
            ...req.body,
            id: parse.thingsIKnow[parse.thingsIKnow.length - 1].id + 1,
        };
        parse.thingsIKnow.push(newThing);
        fs.writeFile(dataFile, JSON.stringify(parse), {
            encoding: 'utf-8',
        }).then(() => {
            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.end(JSON.stringify(newThing));
        });
    });
}

export function updateThings(req: express.Request, resp: express.Response) {
    fs.readFile(dataFile, { encoding: 'utf-8' }).then((things) => {
        const parse = JSON.parse(things) as dbThings;
        let newThing;
        parse.thingsIKnow = parse.thingsIKnow.map((thing) => {
            if (thing.id === +req.params.id) {
                newThing = { ...thing, ...req.body };
                return newThing;
            } else {
                return thing;
            }
        });
        fs.writeFile(dataFile, JSON.stringify(parse), {
            encoding: 'utf-8',
        }).then();
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(newThing));
    });
}

export function deleteThing(req: express.Request, resp: express.Response) {
    fs.readFile(dataFile, { encoding: 'utf-8' }).then((things) => {
        const parse = JSON.parse(things) as dbThings;
        const prevLength = things.length;
        parse.thingsIKnow = parse.thingsIKnow.filter(
            (thing) => thing.id !== +req.params.id
        );
        fs.writeFile(dataFile, JSON.stringify(parse), {
            encoding: 'utf-8',
        }).then();

        resp.status(prevLength === things.length ? 404 : 202);
        resp.end(JSON.stringify({}));
    });
}
