export interface ISeatModel {
  rowPosition: number;
  position: number;
  status: ESeatStatus;
  price: number;
}

export interface IRowModel {
  position: number;
  seats: ISeatModel[];
}

export interface IShowModel {
  dateTime: string[];
  rows: IRowModel[];
}

export interface ITheaterModel {
  id: number;
  name: string;
  address: string;
  logo: string;
  shows: IShowModel[];
}

export enum ESeatStatus {
  Reserved = 'reserved',
  Available = 'available'
}

export interface ITicketModel {
  theaterId: number;
  showId: number;
  row: number;
  seat: number;
}
