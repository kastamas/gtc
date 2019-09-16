import { IMovieModel } from 'entities/Movie';
import { IRowModel, ITheaterModel } from 'entities/Theater/Theater.models';

export interface IShowModel {
  id: number;
  movie: IMovieModel;
  theater: ITheaterModel;
  startDateTime: string;
  endDateTime: string;
  room: {
    number: number;
    rows: IRowModel[];
  };
}
