import { communicationMovie } from 'entities/Movie/Movie.communication';
import { AnyAction, Reducer } from 'redux';
import { RouterState } from 'react-router-redux';

type RoutingReducer = Reducer<RouterState, AnyAction>;

export interface IApplicationState {
  routing?: RoutingReducer | null;
}

export const reducers = {
  ...communicationMovie.reducers
};
