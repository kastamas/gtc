import axios from 'axios';
import { Alert, Button, Card, Col, Descriptions, Divider, Icon, Row, Typography } from 'antd';
import { MoviePageBookingSeat } from 'entities/Movie/components/MoviePageBookingSeat';
import { IMovieModel } from 'entities/Movie/Movie.models';
import { IRowModel, ISeatModel } from 'entities/Theater/Theater.models';
import React, { Component } from 'react';

interface IComponentState {
  selectedSeats: ISeatModel[];
  loading: boolean;
  theaterData?: { rows: IRowModel[] };
}

interface IComponentProps {
  movie: IMovieModel;
}

type AllProps = IComponentProps;

class MoviePageBookingComponent extends Component<AllProps, IComponentState> {
  state = {
    selectedSeats: [],
    loading: false,
    theaterData: undefined
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
    const { selectedSeats } = this.state;
    const { movie } = this.props;
    const { title, description } = movie;

    const theaterData = (this.state.theaterData as unknown) as { rows: IRowModel[] };

    if (this.state.loading || theaterData === undefined) {
      return null;
    }

    return (
      <Row type={'flex'} gutter={32}>
        <Col xs={24} sm={18} className="theater">
          <Row>
            <Alert type="info" message="Click on the seat which suits you" closable={true} />
          </Row>
          <Row gutter={16} type="flex" className="legend pt-3">
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
            {theaterData !== null && (
              <div>
                <div className="screen">screen</div>
                <div style={{ display: 'flex' }}>
                  <div className="mr-3">
                    {theaterData &&
                      theaterData.rows.map(row => (
                        <Row className="mt-0 mb-0">
                          <div className="rows">Row {row.position}</div>
                        </Row>
                      ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {theaterData.rows.map(row => {
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
                    {theaterData.rows.map(row => (
                      <Row className="mt-0 mb-0 ">
                        <div className="rows">Row {row.position}</div>
                      </Row>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Row>
        </Col>
        <Col xs={24} sm={6}>
          {selectedSeats.length > 0 && (
            <>
              <Typography.Title level={4}>Selected seats</Typography.Title>
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
              <Button type={'primary'}>Go to payment</Button>
            </>
          )}
          <Descriptions>
            <Descriptions.Item label="Movie">{title}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
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
}

export const MoviePageBooking = MoviePageBookingComponent;
