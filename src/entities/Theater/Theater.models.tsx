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

export interface ITheaterModel {
  id: number;
  name: string;
  address: string;
  logo: string;
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
