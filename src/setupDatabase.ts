import mongoose from 'mongoose';
import { config } from './config';

export default () => {
  const connect = () => {
    mongoose.set('strictQuery', false);

    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        // log
      })
      .catch(() => {
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on('disconnected', connect);
};
