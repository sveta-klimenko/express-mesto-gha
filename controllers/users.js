import { constants } from "http2";
import { User } from "../models/user.js";

function sendInternalServerError(res) {
  res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: "Произошла серверная ошибка" });
}

function sendNotFoundError(res) {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: "Пользователя с этими данными не существует" });
}

function sendBadRequestError(res) {
  res
    .status(constants.HTTP_STATUS_BAD_REQUEST)
    .send({ message: "Введены некорректные данные" });
}

export const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      sendInternalServerError(res);
    });
};

export const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
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

export const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const updateMyUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const updateMyUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};
