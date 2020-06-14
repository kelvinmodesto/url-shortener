export default interface IDb {
  create(item: any, many: boolean): any;

  read(item: any, many: boolean): any;

  update(id: string, item: any, many: boolean): any;

  delete(id: string, item: any): any;

  isConnected(): Promise<boolean>;
}
