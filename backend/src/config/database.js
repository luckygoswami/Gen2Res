import { connect } from 'mongoose';
import { MONGODB_URI } from '#config/variables.js';

async function connectToDB() {
  try {
    await connect(MONGODB_URI);
    console.log('Successfully connected to DB!');
  } catch (err) {
    console.log('Failed to connect DB!');
  }
}

export { connectToDB };
