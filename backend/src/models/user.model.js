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
  },

  providers: {
    local: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

export const userModel = model('users', userSchema);
