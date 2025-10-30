import { Router } from 'express';
import { CardController } from '../controllers/CardController';

const router = Router();
const cardController = new CardController();

// Rotas CRUD
router.get('/cards', cardController.listCards);
router.get('/cards/:id', cardController.getCard);
router.post('/cards', cardController.createCard);
router.put('/cards/:id', cardController.updateCard);
router.delete('/cards/:id', cardController.deleteCard);

export default router;