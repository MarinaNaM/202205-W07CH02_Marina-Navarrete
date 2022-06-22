import { Request, Response } from 'express';
import fs from 'fs/promises';
import * as c from './things.controller';

jest.mock('fs/promises');

const mockThings = {
    thingsIKnow: [
        {
            id: 1,
            title: 'React',
            responsible: 'Marina',
            happiness: false,
        },
        {
            id: 2,
            title: 'Angular',
            responsible: 'Marina',
            happiness: true,
        },
    ],
};

const mockDataFile = JSON.stringify(mockThings);

let req: Partial<Request>;
let resp: Partial<Response>;
beforeEach(() => {
    req = { params: { id: '1' }, body: '' };
    resp = {
        end: jest.fn(),
        status: jest.fn(),
        setHeader: jest.fn(),
    };
});

describe('Given the getAllController', () => {
    describe('When we call it', () => {
        test('Then it should return all the things I know ', async () => {
            fs.readFile = jest.fn().mockResolvedValue(mockDataFile);
            await c.getAllController(req as Request, resp as Response);
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(mockDataFile);
        });
    });
});

describe('Given the getController', () => {
    describe('When we call it', () => {
        test('Then it should return one thing I know ', async () => {
            fs.readFile = jest.fn().mockResolvedValue(mockDataFile);
            await c.getController(req as Request, resp as Response);
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(
                JSON.stringify(mockThings.thingsIKnow[0])
            );
        });
    });
    describe('When we call it', () => {
        test('Then it shouldnt return one thing I know ', async () => {
            fs.readFile = jest.fn().mockResolvedValue(mockDataFile);
            req = { params: { id: '6' } };
            await c.getController(req as Request, resp as Response);
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({}));
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
});

describe('Given the addThings', () => {
    describe('When we call it', () => {
        test('Then it should create a new thing I know ', async () => {
            const mockResult = { item: 'item' };
            fs.readFile = jest.fn().mockResolvedValue(mockDataFile);
            fs.writeFile = jest.fn({});
            await c.addThings(req as Request, resp as Response);
            expect(resp.setHeader).toHaveBeenCalled();
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
            expect(resp.status).toHaveBeenCalledWith(201);
        });
    });
});
