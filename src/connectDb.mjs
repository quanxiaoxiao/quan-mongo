import mongoose from 'mongoose';

const validateConfig = (config) => {
  if (!config || typeof config !== 'object') {
    throw new Error('config is not object');
  }

  const { database, hostname, port, username, password } = config;

  if (!database || typeof database !== 'string' || database.trim() === '') {
    throw new Error('`database` is empty');
  }

  if (hostname && typeof hostname !== 'string') {
    throw new Error(`hostname \`${hostname}\` invalid`);
  }

  if (port && (!Number.isInteger(port) || port <= 0 || port > 65535)) {
    throw new Error(`port \`${port}\` invalid`);
  }

  if ((username && !password) || (!username && password)) {
    throw new Error('Username and password must both be provided or omitted');
  }

  if (username && typeof username !== 'string') {
    throw new Error(`username \`${username}\` invalid`);
  }

  if (password && typeof password !== 'string') {
    throw new Error(`password \`${password}\` invalid`);
  }
};

const buildMongoURI = (config) => {
  const {
    database,
    hostname = '127.0.0.1',
    port = 27017,
    username,
    password,
  } = config;

  const host = `${hostname}:${port}`;
  const dbName = database.trim();

  if (username && password) {
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    return `mongodb://${encodedUsername}:${encodedPassword}@${host}/${dbName}`;
  }

  return `mongodb://${host}/${dbName}`;
};

const buildMongooseOptions = (config) => {
  const {
    username,
    password,
    authSource = 'admin',
    mongoOptions = {},
  } = config;

  const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0,
    ...mongoOptions,
  };

  if (username && password) {
    options.authSource = authSource;
  }

  return options;
};

const safeCallback = async (callback, ...args) => {
  if (typeof callback === 'function') {
    try {
      await callback(...args);
    } catch (error) {
      console.error(error);
    }
  }
};

export default async (config) => {
  try {
    validateConfig(config);

    const {
      onRequest,
      onConnect,
      onError,
    } = config;

    const uri = buildMongoURI(config);
    const options = buildMongooseOptions(config);

    await safeCallback(onRequest, uri, options);

    mongoose.set('strictQuery', false);

    mongoose.connection.on('error', async (error) => {
      console.error('MongoDB connect error:', error.message);
      await safeCallback(onError, error, uri);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB close connect');
    });

    mongoose.connection.on('reconnected', () => {
      console.info('MongoDB connect retry');
    });

    console.info('connecting MongoDB...');
    await mongoose.connect(uri, options);
    console.info('MongoDB connect ok');
    await safeCallback(onConnect, uri, mongoose.connection);

  } catch (error) {
    console.error('MongoDB connect fail:', error.message);

    await safeCallback(config.onError, error, buildMongoURI(config));
    process.exit(1);
  }
};
