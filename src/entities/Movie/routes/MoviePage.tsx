import { PageHeader, Spin } from 'antd';
import { ERoutes } from 'common/enums/Routes.enum';
import { RouteComponentProps } from 'react-router';
import { communicationMovie, IMovieConnectedProps } from 'entities/Movie/Movie.communication';
import React, { Component } from 'react';

type AllProps = RouteComponentProps & IMovieConnectedProps;

class MoviePageComponent extends Component<AllProps> {
  componentDidMount(): void {
    const { getMovieModel } = this.props;
    const { id } = this.props.match.params;

    getMovieModel(id);
  }

  render() {
    const { movieModel } = this.props;
    const { data, loading } = movieModel;

    if (loading || !data) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      );
    }

    const { id, genres, title, description, cover } = data;

    return (
      <div>
        <PageHeader title={title} onBack={this.onBack} />
      </div>
    );
  }

  onBack = () => {
    const { history } = this.props;

    history.push(`/${ERoutes.Movies}`);
  };
}

export const MoviePage = communicationMovie.injector(MoviePageComponent);
