import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { constants } from 'http2';
import { user } from './routes/users.js';
import { createUser, loginUser } from './controllers/users.js';
import { card } from './routes/cards.js';
import {
  signUpValidate,
  signInValidate,
} from './utils/validator.js';
import { auth } from './middlewares/auth.js';

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', signInValidate, loginUser);
app.post('/signup', signUpValidate, createUser);

app.use(auth);
app.use('/', user);
app.use('/', card);

app.all('/*', (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
