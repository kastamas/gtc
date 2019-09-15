import { Button, Col, Divider, PageHeader, Row, Spin, Typography } from 'antd';
import { ERoutes } from 'common/enums/Routes.enum';
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
              position: 1
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
              position: 1
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
            }
          ]
        },
        {
          position: 4,
          seats: [
            {
              position: 1
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

    const { id, genres, title, description, cover } = data;

    return (
      <div>
        <PageHeader title={title} onBack={this.onBack} className="pl-0" />
        <img src={cover} />
        <p className="pt-3">{description}</p>

        <Divider />

        <Row type={'flex'} gutter={32}>
          <Col>
            <Row type={'flex'} justify={'center'}>
              <Row type={'flex'} style={{ width: '100%' }}>
                <div
                  style={{
                    width: '100%',
                    height: '18px',
                    backgroundColor: 'white',
                    border: '1px solid grey',
                    borderRadius: '30px 30px 0 0',
                    textAlign: 'center',
                    fontSize: '12px',
                    lineHeight: '14px'
                  }}
                >
                  screen
                </div>
              </Row>
              <Row type={'flex'} justify={'center'} gutter={16} className="mt-5">
                <Col>
                  {theaterData.rows.map(row => {
                    return (
                      <Row className="mt-0 mb-0">
                        <div
                          style={{
                            height: '32px',
                            lineHeight: '32px',
                            margin: '2px 0px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Row {row.position}
                        </div>
                      </Row>
                    );
                  })}
                </Col>
                <Col>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {theaterData.rows.map(row => {
                      return (
                        <Row type="flex" className="mt-0 mb-0">
                          {row.seats.map(seat => {
                            return (
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  backgroundColor: '#1890ff',
                                  color: 'white',
                                  textAlign: 'center',
                                  margin: '2px',
                                  lineHeight: '32px',
                                  borderRadius: '4px'
                                }}
                              >
                                {seat.position}
                              </div>
                            );
                          })}
                        </Row>
                      );
                    })}
                  </div>
                </Col>
                <Col>
                  {theaterData.rows.map(row => {
                    return (
                      <Row className="mt-0 mb-0">
                        <div
                          style={{
                            height: '32px',
                            lineHeight: '32px',
                            margin: '2px 0px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Row {row.position}
                        </div>
                      </Row>
                    );
                  })}
                </Col>
              </Row>
            </Row>
          </Col>
          <Col>
            Some Info here
            <br />
            <Button type={'primary'}>Buy Ticket!</Button>
          </Col>
        </Row>
      </div>
    );
  }

  onBack = () => {
    const { history } = this.props;

    history.push(`/${ERoutes.Movies}`);
  };
}

export const MoviePage = communicationMovie.injector(MoviePageComponent);
