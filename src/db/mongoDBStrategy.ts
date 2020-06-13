import { MongoClient } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

import IDb from './db.interface.ts';
import getEnvironmentValues from '../utils/getEnvironmentValues.ts';

export default class MongoDBStrategy implements IDb{
  public model: any;
  public modelName: string;
  public client: MongoClient;
  public database: any;

  constructor(modelName: string) {
    this.client = {} as MongoClient;
    this.modelName = modelName;
    this.connect();
  }

  connect() {
    const client = new MongoClient();
    const {
      mongo: {
        DB_MONGO: db,
        DB_USER_MONGO: user,
        DB_PASS_MONGO: pass,
        DB_HOST_MONGO: host,
        DB_NAME_MONGO: name,
        DB_PORT_MONGO: port
      }
    } = getEnvironmentValues();
    client.connectWithUri(`${db}://${user}:${pass}@${host}:${port}/${name}`);
    this.client = client;
    this.model = client.database(name).collection(this.modelName);
  }

  async create(item: any = {}, many: boolean = false) {
    if (many) {
      return await this.model.insertMany(item);
    } else {
      return await this.model.insertOne(item);
    }
  }

  async read(item: any = {}, many: boolean = false) {
    if (many) {
      return await this.model.findOne(item);
    } else {
      return await this.model.find(item);
    }
  }

  async update(id: number, item: any = {}, many: boolean = false) {
    if (many) {
      return await this.model.updateMany({ _id: id }, { $set: item });
    } else {
      return await this.model.updateOne(item);
    }
  }

  async delete(id: number, many: boolean = false) {
    if (many) {
      return await this.model.deleteMany({});
    } else {
      return await this.model.deleteOne({ _id: id });
    }
  }

}
