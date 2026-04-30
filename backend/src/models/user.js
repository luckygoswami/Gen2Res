import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, 'Username is already taken!'],
    required: true,
  },

  email: {
    type: String,
    unique: [true, 'An account with this email address!'],
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const userModel = model('users', userSchema);

export default userModel;
