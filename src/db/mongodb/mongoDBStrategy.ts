import { MongoClient } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

import { ContextStrategy as Context } from '../base';

export default class MongoDBStrategy extends Context {
  public static buildConnectionString() {}

  public static connect() {
    this.connect()
  }
  public connection: any;
  public model: any;

  constructor(connection: any, model: any) {
    super(connection);
    this.model = model;
    this.connection = connection;
  }

  public async create(item: any = {}) {
    return this.model.create(item);
  }

  public async read(item: any = {}) {
    return this.model.find(item);
  }

  public async update(id: number, item: any = {}) {
    return this.model.updateOne({ _id: id }, { $set: item });
  }

  public async delete(id: number) {
    return this.model.deleteOne({ _id: id });
  }

  public async isConnected() {
    const state: number = this.connection.readyState;
    if (state === 1) return state;
    if (state !== 2) return state;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.connection.readyState;
  }
}
