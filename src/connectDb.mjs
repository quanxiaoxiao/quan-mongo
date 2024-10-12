import mongoose from 'mongoose';

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
    console.error('mongo database unset');
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
