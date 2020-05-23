export interface IDb {
  create(item: any): any;
  read(item: any): any;
  update(id: number, item: number): any;
  delete(id: number): any;
  isConnected(): any;
}
