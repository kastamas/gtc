import axios from 'axios';
import { Alert, Button, Card, Col, Descriptions, Divider, Icon, message, Row, Typography } from 'antd';
import { MoviePageBookingSeat } from 'entities/Movie/components/MoviePageBookingSeat';
import { MoviePagePurchaseModal } from 'entities/Movie/components/MoviePagePurchaseModal';
import { MoviePageSelectedSeatsInfo } from 'entities/Movie/components/MoviePageSelectedSeatsInfo';
import { IMovieModel } from 'entities/Movie/Movie.models';
import { IShowModel } from 'entities/Shows/Shows.models';
import { IRowModel, ISeatModel } from 'entities/Theater/Theater.models';
import React, { Component } from 'react';

interface IComponentState {
  selectedSeats: ISeatModel[];
  loading: boolean;
  theaterData?: { rows: IRowModel[] };
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
    loading: false,
    theaterData: undefined,
    isModalDisplaying: false
  };

  componentDidMount(): void {
    this.setState({
      loading: true
    });

    axios.get('/rows').then(response => {
      this.setState({
        loading: false,
        theaterData: response.data as { rows: IRowModel[] }
      });
    });
  }

  render() {
    const { selectedSeats, isModalDisplaying } = this.state;
    const { movie, selectedShow } = this.props;
    const { title, description } = movie;

    if (!selectedShow) {
      return null;
    }

    const { room } = selectedShow;

    // const theaterData = (this.state.theaterData as unknown) as { rows: IRowModel[] };

    /* if (this.state.loading || theaterData === undefined) {
      return null;
    }*/

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
                      <Row className="mt-0 mb-0">
                        <div className="rows">Row {row.position}</div>
                      </Row>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {room.rows.map(row => {
                        return (
                          <Row type="flex" className="mt-0 mb-0">
                            {row.seats.map(seat => (
                              <MoviePageBookingSeat
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
                      <Row className="mt-0 mb-0 ">
                        <div className="rows">Row {row.position}</div>
                      </Row>
                    ))}
                  </div>
                </div>
              </div>
            </Row>
          </Col>
          <Col xs={24} sm={6}>
            {selectedSeats.length > 0 && (
              <>
                <MoviePageSelectedSeatsInfo selectedSeats={selectedSeats} />
                <Button type={'primary'} onClick={this.onToggleModal}>
                  Go to payment
                </Button>
              </>
            )}
            {/* <Descriptions layout="vertical" column={1} size={'small'} className="mt-3">
              <Descriptions.Item label="Movie">{title}</Descriptions.Item>
              <Descriptions.Item label="Cinema">-</Descriptions.Item>
              <Descriptions.Item label="Show time">-</Descriptions.Item>
            </Descriptions>*/}
          </Col>
        </Row>

        <MoviePagePurchaseModal
          selectedSeats={selectedSeats as ISeatModel[]}
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
