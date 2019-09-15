import { Button, Card, Col, Descriptions, Divider, PageHeader, Row, Spin, Typography } from 'antd';
import { ERoutes } from 'common/enums/Routes.enum';
import { MoviePageBooking } from 'entities/Movie/components';
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
      <>
        <PageHeader title={title} onBack={this.onBack} className="pl-0" />
        <Card bordered={true}>
          <Row type={'flex'} gutter={16} style={{ flexFlow: 'row' }}>
            <Col>
              <div>
                <img src={cover} />
              </div>
            </Col>
            <Col>
              <Descriptions>
                <Descriptions.Item label="Description">{description}</Descriptions.Item>
                <Descriptions.Item label="Genres">{genres.join(', ')}</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>

          <Divider />

          <MoviePageBooking movie={movieModel.data} />
        </Card>
      </>
    );
  }

  onBack = () => {
    const { history } = this.props;

    history.push(`/${ERoutes.Movies}`);
  };
}

export const MoviePage = communicationMovie.injector(MoviePageComponent);
