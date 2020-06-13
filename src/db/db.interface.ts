export default interface IDb {
  create(item: any, many: boolean): any;

  read(item: any, many: boolean): any;

  update(id: number, item: number, many: boolean): any;

  delete(id: number, many: boolean): any;

}
