import mongoose from 'mongoose';
import { envs } from '@config/env';
import { logger } from '@config/logger/logger';
/**
 * This function is used for connecting database
 */
export const connect = (): void => {
  let connectioString = '';
  if (envs.db.username && envs.db.password) {
    // connectioString = `mongodb://${envs.db.username}:${envs.db.password}@${envs.db.host}:${envs.db.port}/${envs.db.database}?authSource=retryWrites=true&w=majority`;
    connectioString = 'mongodb+srv://indranilgupta:9iVarwVL3L0XmjV9@cluster0.h7j4eqi.mongodb.net/employeechat?retryWrites=true&w=majority';
  } else {
    connectioString = `mongodb://${envs.db.host}:${envs.db.port}/${envs.db.database}`;
  }

  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  mongoose.connect(connectioString, options).then((err) => {
    logger.info('Mongo DB Connected');
  }).catch((err) =>{
    logger.error('Mongo DB Connection Error', err);
    // console.log(err);
  });
};
