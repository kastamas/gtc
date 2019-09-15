import { Icon } from 'antd';
import { ESeatStatus, ISeatModel } from 'entities/Theater/Theater.models';
import React, { Component } from 'react';

interface IComponentProps {
  seat: ISeatModel;
  onSelectSeat: (seat: ISeatModel) => void;
  onDeselectSeat: (seat: ISeatModel) => void;
}

interface IComponentState {
  isActive: boolean;
}

type AllProps = IComponentProps;

class MoviePageBookingSeatComponent extends Component<AllProps> {
  state = { isActive: false };

  render() {
    const { isActive } = this.state;
    const { seat } = this.props;

    const { status, position } = seat;

    if (status === ESeatStatus.Reserved) {
      return (
        <div className="seat">
          <Icon type="user" />
        </div>
      );
    }

    if (status === ESeatStatus.Available || !status) {
      return isActive ? (
        <div className="seat seat--available active" onClick={event => this.onDeselectSeat(event, seat)}>
          {position}
        </div>
      ) : (
        <div className="seat seat--available" onClick={event => this.onSelectSeat(event, seat)}>
          {position}
        </div>
      );
    }

    return null;
  }

  onSelectSeat = (event, seat) => {
    const { onSelectSeat } = this.props;

    this.setState({
      isActive: true
    });

    onSelectSeat(seat);
  };

  onDeselectSeat = (event, seat) => {
    const { onDeselectSeat } = this.props;

    this.setState({
      isActive: false
    });

    onDeselectSeat(seat);
  };
}

export const MoviePageBookingSeat = MoviePageBookingSeatComponent;
