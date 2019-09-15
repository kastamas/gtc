import { Divider, Typography } from 'antd';
import { ISeatModel } from 'entities/Theater/Theater.models';
import React, { Component } from 'react';

interface IComponentProps {
  selectedSeats: ISeatModel[];
}

class MoviePageSelectedSeatsInfoComponent extends Component<IComponentProps> {
  render() {
    const { selectedSeats } = this.props;

    return (
      <>
        <Typography.Title level={4}>Selected seats ({selectedSeats.length})</Typography.Title>
        {selectedSeats.map((seat: ISeatModel) => {
          return (
            <>
              <div>
                Row: {seat.rowPosition}, Seat: {seat.position}
                <br />
                <span className="color--primary">{seat.price} RUR</span>
              </div>
              <Divider className="mt-3 mb-3" />
            </>
          );
        })}

        <Typography.Title level={4}>
          Total:{' '}
          <span className="color--primary">
            {selectedSeats.reduce((prevVal: number, currentVal: ISeatModel) => prevVal + currentVal.price, 0)} RUR
          </span>
        </Typography.Title>
      </>
    );
  }
}

export const MoviePageSelectedSeatsInfo = MoviePageSelectedSeatsInfoComponent;
