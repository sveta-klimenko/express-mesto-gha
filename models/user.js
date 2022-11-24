import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        const linkRegex = /^https?:\/\/(www.)?[\w\-._~:\/?#[\]@!$&'()*+,;=]*#?$/;
        return linkRegex.test(v);
      },
      message: 'Неверный формат ссылки на аватар',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Почта указана неверно',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const user = mongoose.model('user', userSchema);
