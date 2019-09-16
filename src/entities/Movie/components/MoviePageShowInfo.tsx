import { Descriptions } from 'antd';
import { DateFormatter } from 'common/components/dataDisplay';
import { IShowModel } from 'entities/Shows/Shows.models';
import React, { Component } from 'react';

interface IComponentProps {
  show: IShowModel;
  layout?: 'vertical' | 'horizontal';
  colNumber?: number;
}

class MoviePageShowInfoComponent extends Component<IComponentProps> {
  render() {
    const { show, layout, colNumber } = this.props;
    const { movie, startDateTime, theater, room } = show;

    return (
      <Descriptions layout={layout || 'vertical'} column={colNumber || 1} size={'small'} className="mt-3">
        <Descriptions.Item label="Movie">{movie.title}</Descriptions.Item>
        <Descriptions.Item label="Show time">
          <DateFormatter date={startDateTime} format="Do MMM HH:mm" />
        </Descriptions.Item>
        <Descriptions.Item label="Cinema">
          <span>«{theater.name}», </span>
          <span>{theater.address}, </span>
          <span>Room: {room.number}</span>
        </Descriptions.Item>
      </Descriptions>
    );
  }
}

export const MoviePageShowInfo = MoviePageShowInfoComponent;
