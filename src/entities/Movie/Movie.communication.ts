import axios from 'axios';
import { actionsTypes, APIProvider, BaseStrategy, Branch, buildCommunication, StoreBranch } from '@axmit/redux-communications';
import { IMovieModel } from 'entities/Movie/Movie.models';

export interface IMovieConnectedProps {
  movieModel: StoreBranch<IMovieModel>;
  movieCollection: StoreBranch<IMovieModel[]>;
  getMovieModel(id: number): void;
  getMovieCollection(): void;
}

const collectionAPIProvider = [
  new APIProvider(
    actionsTypes.get,
    (): Promise<any> => {
      return axios.get('/movies').then(response => response.data);
    }
  )
];

const modelAPIProvider = [
  new APIProvider(
    actionsTypes.get,
    (id): Promise<any> => {
      return axios.get(`/movies/${id}`).then(response => response.data);
    }
  )
];

const branches = [new Branch('collection', collectionAPIProvider), new Branch('model', modelAPIProvider)];

const namespace = 'movie';

const strategy = new BaseStrategy({
  namespace,
  branches
});

export const communicationMovie = buildCommunication<IMovieConnectedProps>(strategy);
