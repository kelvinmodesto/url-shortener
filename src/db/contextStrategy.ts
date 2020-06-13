import IDb from './db.interface.ts';

export default class ContextStrategy implements IDb {
  public database: any;
  constructor(database: any) {
    this.database = database;
  }
  public create(item: any = {}, many: boolean = false) {
    return this.database.create(item);
  }

  public read(item: any = {}, many: boolean = false) {
    return this.database.read(item);
  }

  public update(id: number, item: any = {}, many: boolean = false) {
    return this.database.update(id, item);
  }

  public delete(id: number, many: boolean = false) {
    return this.database.delete(id);
  }

}
