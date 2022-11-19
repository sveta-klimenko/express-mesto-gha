import { constants } from 'http2';
import { card } from '../models/card.js';

function sendInternalServerError(res) {
  res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: 'Произошла серверная ошибка' });
}

function sendNotFoundError(res) {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Карточки с этими данными не существует' });
}

function sendBadRequestError(res) {
  res
    .status(constants.HTTP_STATUS_BAD_REQUEST)
    .send({ message: 'Введены некорректные данные' });
}

export const getCards = (req, res) => {
  card.find({}).populate('likes').populate('owner').then((cards) => res.send({ data: cards }))
    .catch(() => {
      sendInternalServerError(res);
    });
};

export const createCard = (req, res) => {
  const { name, link } = req.body;
  card
    .create({ name, link, owner: req.user._id })
    .then((data) => card.findById(data._id).populate('owner'))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const deleteCard = (req, res) => {
  card
    .findByIdAndRemove(req.params.cardId).populate('likes').populate('owner')
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const likeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate('likes').populate('owner')
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const dislikeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate('likes').populate('owner')
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};
