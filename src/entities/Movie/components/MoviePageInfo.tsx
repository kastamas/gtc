import { Card, Col, Descriptions, Row, Statistic } from 'antd';
import { IMovieModel } from 'entities/Movie/Movie.models';
import React, { Component } from 'react';

interface IComponentProps {
  movie: IMovieModel;
}

class MoviePageInfoComponent extends Component<IComponentProps> {
  render() {
    const { movie } = this.props;
    const { cover, description, imdbRating, genres, director, starring } = movie;

    return (
      <Row type={'flex'} gutter={16} style={{ flexFlow: 'row' }}>
        <Col>
          <div>
            <img src={cover} />
          </div>
        </Col>
        <Col>
          <Descriptions layout="vertical" size="small">
            <Descriptions.Item label="Description">{description}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col>
          <Descriptions layout="vertical" column={1} size="small">
            <Descriptions.Item label="IMDb rating">
              <Statistic value={imdbRating} valueStyle={{ color: '#1890ff' }} />
            </Descriptions.Item>
            <Descriptions.Item label="Genre" className="text--capitalize">
              {genres.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item label="Director">{director}</Descriptions.Item>
            <Descriptions.Item label="Starring">{starring.join(', ')}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    );
  }
}

export const MoviePageInfo = MoviePageInfoComponent;
