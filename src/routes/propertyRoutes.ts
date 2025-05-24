import { Router } from 'express';
import * as propertyController from '../controllers/propertyController';

const router = Router();

router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.post('/', propertyController.createProperty);
router.delete('/:id', propertyController.deleteProperty); // rota delete adicionada

export default router;