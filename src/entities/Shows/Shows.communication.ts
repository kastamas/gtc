import axios from 'axios';
import { actionsTypes, APIProvider, BaseStrategy, Branch, buildCommunication, StoreBranch } from '@axmit/redux-communications';
import { IShowModel } from 'entities/Shows/Shows.models';

export interface IShowConnectedProps {
  showModel: StoreBranch<IShowModel>;
  showCollection: StoreBranch<IShowModel[]>;
  getShowModel(id: number): void;
  getShowCollection(movieId: number): void;
}

const collectionAPIProvider = [
  new APIProvider(
    actionsTypes.get,
    (movieId: number): Promise<any> => {
      return axios
        .get('/shows', {
          params: { 'movie.id': movieId }
        })
        .then(response => response.data);
    }
  )
];

const modelAPIProvider = [
  new APIProvider(
    actionsTypes.get,
    (id): Promise<any> => {
      return axios.get(`/shows/${id}`).then(response => response.data);
    }
  )
];

const branches = [new Branch('collection', collectionAPIProvider), new Branch('model', modelAPIProvider)];

const namespace = 'show';

const strategy = new BaseStrategy({
  namespace,
  branches
});

export const communicationShows = buildCommunication<IShowConnectedProps>(strategy);
