import { Router } from 'express';

import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';

export const card = Router();

card.get('/cards', getCards);
card.post('/cards', createCard);
card.delete('/cards/:cardId', deleteCard);
card.put('/cards/:cardId/likes', likeCard);
card.delete('/cards/:cardId/likes', dislikeCard);
