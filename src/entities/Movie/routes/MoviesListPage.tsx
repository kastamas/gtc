import { Button, Card, List, Row, Typography } from 'antd';
import { ERoutes } from 'common/enums/Routes.enum';
import { ConnectedRouterProps } from 'connected-react-router';
import { communicationMovie, IMovieConnectedProps } from 'entities/Movie/Movie.communication';
import React, { Component } from 'react';

type AllProps = IMovieConnectedProps & ConnectedRouterProps;

class MoviesListPageComponent extends Component<AllProps> {
  componentDidMount(): void {
    const { getMovieCollection, movieCollection } = this.props;

    getMovieCollection();
  }

  render() {
    const { movieCollection } = this.props;
    const { data, loading } = movieCollection;

    console.log(data);
    return (
      <div className="body--with-h-padding">
        <Typography.Title>Now showing!</Typography.Title>

        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4
          }}
          loading={loading}
          dataSource={data || []}
          renderItem={movie => (
            <List.Item className="movie">
              <Card
                cover={
                  <div className="movie__card__cover">
                    <img
                      src={movie.cover}
                      style={{ cursor: 'pointer', width: '100%' }}
                      onClick={() => this.goToMovie(movie.id)}
                    />
                  </div>
                }
                className="movie__card box-shadowed--interactive"
              >
                <div className="movie__card__info">
                  <Typography.Paragraph ellipsis={{ rows: 2 }} className="movie__card__title mb-3">
                    {movie.title}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text--capitalize movie__card__genres" ellipsis={{ rows: 1 }}>
                    {movie.genres.join(', ')}
                  </Typography.Paragraph>
                </div>
                <Row type="flex" justify="center">
                  <Button type="primary" onClick={() => this.goToMovie(movie.id)} className="w--100">
                    Buy a Ticket!
                  </Button>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }

  goToMovie = (id: number) => {
    const { history } = this.props;

    history.push(`/${ERoutes.Movies}/${id}`);
  };
}

export const MoviesListPage = communicationMovie.injector(MoviesListPageComponent);
