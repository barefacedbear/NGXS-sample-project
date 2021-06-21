import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import db from './models';

export class AppController {

    constructor() {
        dotenv.config();
    }

    async create(req: Request, res: Response) {
        try {
            await db.sample.create(req.body);
            res.status(201).send({ success: true, data: '', message: 'CREATED', status: 'OK' });
        } catch (error) {
            res.status(401).send({ success: false, data: '', message: 'INTERNAL SERVER ERROR', status: 'ERROR' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            res.status(200).send(await db.sample.findAll({
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            }));
        } catch(error) {
            res.status(401).send({ success: false, data: '', message: 'INTERNAL SERVER ERROR', status: 'ERROR' });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            res.status(200).send({ success: true, data: await db.sample.findByPk(req.params.id, {
                attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
            }), message: 'FOUND', status: 'OK' });
        } catch(error) {
            res.status(401).send({ success: false, data: '', message: 'INTERNAL SERVER ERROR', status: 'ERROR' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            await db.sample.update(req.body, { where: { id: req.params.id } });
            res.status(201).send({ success: true, data: '', message: 'UPDATED', status: 'OK' });
        } catch(error) {
            res.status(401).send({ success: false, data: '', message: 'INTERNAL SERVER ERROR', status: 'ERROR' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await db.sample.destroy({ where: { id: req.params.id }, truncate: false });
            res.status(200).send({ success: true, data: '', message: 'DONE', status: 'OK' });
        } catch(error) {
            res.status(401).send({ success: false, data: '', message: 'INTERNAL SERVER ERROR', status: 'ERROR' });
        }
    }
}