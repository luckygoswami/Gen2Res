import { connect } from 'mongoose';

async function connectToDB() {
  try {
    await connect(process.env.MONGODB_URI);
    console.log('Successfully connected to DB!');
  } catch (err) {
    console.log('Failed to connect DB!');
  }
}

export { connectToDB };
