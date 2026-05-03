import { Schema, model } from 'mongoose';

const tokenBlacklistSchema = new Schema(
  {
    token: {
      type: String,
      required: [true, 'token is required to be added in a blacklist'],
    },
  },
  {
    timestamps: true,
  },
);

const tokenBlacklistModel = model('blacklistTokens', tokenBlacklistSchema);

export { tokenBlacklistModel };
