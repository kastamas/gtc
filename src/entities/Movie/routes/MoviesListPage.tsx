import { Card, List, Typography } from 'antd';
import { communicationMovie, IMovieConnectedProps } from 'entities/Movie/Movie.communication';
import React, { Component } from 'react';

type AllProps = IMovieConnectedProps;

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
      <div>
        <Typography.Title>Now showing</Typography.Title>

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
            <List.Item>
              <Card title={movie.title} cover={<img src={movie.cover} />}>
                <Typography.Paragraph ellipsis={{ rows: 2 }}>{movie.description}</Typography.Paragraph>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export const MoviesListPage = communicationMovie.injector(MoviesListPageComponent);
