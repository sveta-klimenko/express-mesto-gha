import { constants } from "http2";
import { Card } from "../models/card.js";

function sendInternalServerError(res) {
  res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: "Произошла серверная ошибка" });
}

function sendNotFoundError(res) {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: "Карточки с этими данными не существует" });
}

function sendBadRequestError(res) {
  res
    .status(constants.HTTP_STATUS_BAD_REQUEST)
    .send({ message: "Введены некорректные данные" });
}

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      sendInternalServerError(res);
    });
};

export const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const deleteCard = (req, res) => {
  console.log(req.params);
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};
