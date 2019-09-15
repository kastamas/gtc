import { Alert, Button, Card, Col, Descriptions, Icon, Row, Typography } from 'antd';
import { IMovieModel } from 'entities/Movie/Movie.models';
import React, { Component } from 'react';

interface IComponentProps {
  movie: IMovieModel;
}

type AllProps = IComponentProps;

class MoviePageBookingComponent extends Component<AllProps> {
  render() {
    const theaterData = {
      rows: [
        {
          position: 1,
          seats: [
            {
              position: 1
            },
            {
              position: 2
            }
          ]
        },
        {
          position: 2,
          seats: [
            {
              position: 1,
              status: 'reserved'
            },
            {
              position: 2
            },
            {
              position: 3
            },
            {
              position: 4
            }
          ]
        },
        {
          position: 3,
          seats: [
            {
              position: 1,
              status: 'reserved'
            },
            {
              position: 2
            },
            {
              position: 3
            },
            {
              position: 4,
              status: 'reserved'
            },
            {
              position: 5
            },
            {
              position: 6
            }
          ]
        },
        {
          position: 4,
          seats: [
            {
              position: 1,
              status: 'reserved'
            },
            {
              position: 2
            },
            {
              position: 3
            },
            {
              position: 4
            },
            {
              position: 5
            },
            {
              position: 6
            },
            {
              position: 7
            },
            {
              position: 8
            },
            {
              position: 9
            },
            {
              position: 10
            },
            {
              position: 11
            },
            {
              position: 12
            }
          ]
        }
      ]
    };

    const { movie } = this.props;
    const { title, description } = movie;

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
              $price
            </Col>
          </Row>
          <Row type={'flex'} justify={'center'} gutter={16} className="mt-5">
            <div>
              <div className="screen">screen</div>
              <div style={{ display: 'flex' }}>
                <div className="mr-3">
                  {theaterData.rows.map(row => (
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
                          {row.seats.map(seat => {
                            return seat.status !== 'reserved' ? (
                              <div className="seat seat--available">{seat.position}</div>
                            ) : (
                              <div className="seat">
                                <Icon type="user" />
                              </div>
                            );
                          })}
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
          </Row>
        </Col>
        <Col xs={24} sm={6}>
          <Descriptions>
            <Descriptions.Item label="Movie">{title}</Descriptions.Item>
          </Descriptions>
          <Button type={'primary'}>Buy Ticket!</Button>
          <Button type={'default'}>Buy Ticket!</Button>
        </Col>
      </Row>
    );
  }
}

export const MoviePageBooking = MoviePageBookingComponent;
