import { MongoClient } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

import ContextStrategy from './contextStrategy.ts';
import getEnvironmentValues from '../utils/getEnvironmentValues.ts';

export default class MongoDBStrategy extends ContextStrategy {
  public connection: any;
  public model: any;
  public static client: MongoClient;
  static async connect() {
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
    await this.client.connectWithUri(`${db}://${user}:${pass}@${host}:${port}/${name}`);
    return this.client.database(name);
  }

  constructor(connection: any, model: string) {
    super(connection);
    this.connection = connection;
    this.model = connection.collection(model);
  }

  public async create(item: any = {}, many: boolean = false) {
    return  many ? this.model.insertMany(item) : this.model.insertOne(item);
  }

  public async read(item: any = {}, many: boolean = false) {
    return many ? this.model.findOne(item) : this.model.find(item);
  }

  public async update(id: number, item: any = {}, many: boolean = false) {
    return many ? this.model.updateMany({ _id: id }, { $set: item }) : this.model.updateOne(item);
  }

  public async delete(id: number, many: boolean = false) {
    return many ? this.model.deleteMany({}) : this.model.deleteOne({ _id: id });
  }
}
