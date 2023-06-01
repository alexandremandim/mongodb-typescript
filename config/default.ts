import { MongoClientOptions } from 'mongodb';

const database: {
  name: string;
  options: MongoClientOptions;
  url: string;
} = {
  name: 'Orders',
  options: {
    forceServerObjectId: true,
  },
  url: 'mongodb://localhost:27017',
};

export default {
  database,
};
