import { Router } from 'express';
import { AppController } from './app.controller';

const router = Router();
const controller = new AppController();

router.post('/create', controller.create);
router.get('/getAll', controller.getAll);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

export = router;
