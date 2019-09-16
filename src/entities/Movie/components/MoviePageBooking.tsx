import { Alert, Button, Col, Divider, Icon, message, Row, Typography } from 'antd';
import { MoviePageBookingSeat } from 'entities/Movie/components/MoviePageBookingSeat';
import { MoviePagePurchaseModal } from 'entities/Movie/components/MoviePagePurchaseModal';
import { MoviePageSelectedSeatsInfo } from 'entities/Movie/components/MoviePageSelectedSeatsInfo';
import { IMovieModel } from 'entities/Movie/Movie.models';
import { IShowModel } from 'entities/Shows/Shows.models';
import { ISeatModel } from 'entities/Theater/Theater.models';
import React, { Component, PureComponent } from 'react';

interface IComponentState {
  selectedSeats: ISeatModel[];
  isModalDisplaying: boolean;
}

interface IComponentProps {
  movie: IMovieModel;
  selectedShow?: IShowModel;
}

type AllProps = IComponentProps;

class MoviePageBookingComponent extends Component<AllProps, IComponentState> {
  state = {
    selectedSeats: [],
    isModalDisplaying: false
  };

  componentDidUpdate(prevProps: Readonly<AllProps>, prevState: Readonly<IComponentState>): void {
    if (prevProps.selectedShow !== this.props.selectedShow) {
      this.setState({
        selectedSeats: []
      });
    }
  }

  render() {
    const { selectedSeats, isModalDisplaying } = this.state;
    const { selectedShow } = this.props;

    if (!selectedShow) {
      return null;
    }

    const { room } = selectedShow;

    return (
      <>
        <Divider />
        <Row type={'flex'} gutter={32}>
          <Col xs={24} sm={18} className="theater">
            <Row>
              <Typography.Title level={4}>2. Tickets</Typography.Title>
              <Alert type="info" message="Click on the seat which suits you" closable={true} />
            </Row>
            <Row gutter={16} type="flex" className="legend pt-3 pb-5">
              <Col className="legend__item">
                <div className="seat mr-3">
                  <Icon type="user" />
                </div>
                Unavailable seats
              </Col>
              <Col className="legend__item ">
                <div className="seat seat--available mr-3" />
                330 RUR
              </Col>
            </Row>
            <Row type={'flex'} justify={'center'} gutter={16} className="mt-5">
              <div>
                <div className="screen">screen</div>
                <div style={{ display: 'flex' }}>
                  <div className="mr-3">
                    {room.rows.map(row => (
                      <Row className="mt-0 mb-0" key={row.position}>
                        <div className="rows">Row {row.position}</div>
                      </Row>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {room.rows.map(row => {
                        return (
                          <Row type="flex" className="mt-0 mb-0" key={row.position}>
                            {row.seats.map(seat => (
                              <MoviePageBookingSeat
                                key={seat.position}
                                seat={seat as ISeatModel}
                                onSelectSeat={this.onSelectSeat}
                                onDeselectSeat={this.onDeselectSeat}
                              />
                            ))}
                          </Row>
                        );
                      })}
                    </div>
                  </div>
                  <div className="ml-3">
                    {room.rows.map(row => (
                      <Row className="mt-0 mb-0 " key={row.position}>
                        <div className="rows">Row {row.position}</div>
                      </Row>
                    ))}
                  </div>
                </div>
              </div>
            </Row>
          </Col>
          <Col xs={24} sm={6}>
            {selectedSeats && selectedSeats.length > 0 && (
              <>
                <MoviePageSelectedSeatsInfo selectedSeats={selectedSeats} />
                <Button type={'primary'} onClick={this.onToggleModal}>
                  Go to payment
                </Button>
              </>
            )}
          </Col>
        </Row>

        <MoviePagePurchaseModal
          selectedShow={selectedShow}
          selectedSeats={selectedSeats}
          isDisplaying={isModalDisplaying}
          onConfirmPayment={this.onConfirmPayment}
          onToggleModal={this.onToggleModal}
        />
      </>
    );
  }

  onSelectSeat = (seat: ISeatModel) => {
    this.setState(state => {
      return { selectedSeats: state.selectedSeats.concat([seat]) };
    });
  };

  onDeselectSeat = seat => {
    this.setState(state => {
      const index = state.selectedSeats.findIndex(
        findSeat => findSeat.position === seat.position && findSeat.rowPosition === seat.rowPosition
      );

      if (index !== -1) {
        state.selectedSeats.splice(index, 1);
      }

      return { selectedSeats: state.selectedSeats };
    });
  };

  onToggleModal = () => {
    this.setState(state => {
      return { isModalDisplaying: !state.isModalDisplaying };
    });
  };

  onConfirmPayment = (customerDetails: { email: string }) => {
    const { email } = customerDetails;

    this.onToggleModal();

    this.setState({
      selectedSeats: []
    });

    message.success(`Purchasing successful! Tickets has been sent on your email: ${email}`, 5);
  };

  updateSeatsStatus = () => {};
}

export const MoviePageBooking = MoviePageBookingComponent;
