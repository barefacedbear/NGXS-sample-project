import express, { Request, Response, NextFunction, urlencoded, json, Application } from 'express';
import router from './app.routes';
import db from './models';

export class App {
    app: Application = express();
    private readonly URL: string = '/api';
    
    constructor() {
        db.sequelize.sync().then(() => console.log('Drop and re-sync db'));
        this.app.use(json({
            type: 'application/json',
            limit: '50mb'
        }));
        this.app.use(urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 50000
        }));
        this.enableCORS();
        this.apis();
    }

    private enableCORS() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 
            'GET, POST, PATCH, PUT, DELETE, OPTIONS');
            next();
        });
    }

    private apis() {
        this.app.use(this.URL, router);
    }
}