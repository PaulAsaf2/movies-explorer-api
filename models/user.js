import mongoose from 'mongoose';

const { Schema } = mongoose;
const { model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // match: [checkEmail, 'Некорректный адрес электронной почты'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

const User = model('user', userSchema);
export default User;
