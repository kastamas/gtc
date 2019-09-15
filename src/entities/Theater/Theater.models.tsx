export interface ITheaterModel {
  name: string;
  address: string;
  logo: string;
  shows: IShowModel[];
}

export interface IShowModel {
  dateTime: string[];
  rows: IRowModel[];
}

export interface ISeatModel {
  position: number;
  status: ESeatStatus;
}

export interface IRowModel {
  rowPosition: number;
  position: number;
  seats: ISeatModel;
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
