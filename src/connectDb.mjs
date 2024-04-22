import mongoose from 'mongoose';

/**
 * @typedef {Object} MongoOptions
 * @property {string} database
 * @property {string} [hostname='127.0.0.1']
 * @property {number} [port=27017]
 * @property {string} [username='']
 * @property {string} [password='']
 * @property {Function} [onRequest]
 * @property {Function} [onConnect]
 */

/**
 * @param {MongoOptions} options
 */
export default async ({
  database,
  hostname = '127.0.0.1',
  port = 27017,
  username,
  password,
  onRequest,
  onConnect,
}) => {
  let uri;

  const options = {};

  if (!database || database.trim() === '') {
    console.error('mongo database is not set');
    process.exit(1);
  }

  if (username && password) {
    options.authSource = 'admin';
    uri = `mongodb://${username}:${password}@${hostname}:${port}/${database}`;
  } else {
    uri = `mongodb://${hostname}:${port}/${database}`;
  }
  if (onRequest) {
    await onRequest(uri);
  }

  mongoose.set('strictQuery', false);

  await mongoose.connect(uri, options);

  if (onConnect) {
    await onConnect(uri);
  }
};
