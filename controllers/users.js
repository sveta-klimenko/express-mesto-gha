import { constants } from 'http2';
import { user } from '../models/user.js';

function sendInternalServerError(res) {
  res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: 'Произошла серверная ошибка' });
}

function sendNotFoundError(res) {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Пользователя с этими данными не существует' });
}

function sendBadRequestError(res) {
  res
    .status(constants.HTTP_STATUS_BAD_REQUEST)
    .send({ message: 'Введены некорректные данные' });
}

export const getAllUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      sendInternalServerError(res);
    });
};

export const getUser = (req, res) => {
  user
    .findById(req.params.userId)
    .then((data) => {
      if (data) {
        res.send({ data });
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

export const createUser = (req, res) => {
  user
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const updateMyUser = (req, res) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};

export const updateMyUserAvatar = (req, res) => {
  const { avatar } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        sendNotFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        sendBadRequestError(res);
      } else {
        sendInternalServerError(res);
      }
    });
};
