import { Alert, Button, Col, Row, Table, Typography } from 'antd';
import { DateFormatter } from 'common/components/dataDisplay';
import { MoviePageShowInfo } from 'entities/Movie/components/MoviePageShowInfo';
import { IMovieModel } from 'entities/Movie/Movie.models';
import { communicationShows, IShowConnectedProps } from 'entities/Shows/Shows.communication';
import { IShowModel } from 'entities/Shows/Shows.models';
import React, { Component } from 'react';

interface IComponentProps {
  movie: IMovieModel;
  selectedShow?: IShowModel;
  onSelect: (show: IShowModel) => void;
  onDeselect: () => void;
}

type AllProps = IComponentProps & IShowConnectedProps;

class MoviePageTheatersListComponent extends Component<AllProps> {
  componentDidMount(): void {
    const { getShowCollection, movie } = this.props;

    getShowCollection(movie.id);
  }

  render() {
    const { showCollection, onSelect, selectedShow, onDeselect } = this.props;
    const { loading, data } = showCollection;

    return (
      <div>
        <Typography.Title level={4}>1. Program</Typography.Title>
        <Alert type="info" message="Select the show which suits you" closable={true} className="mb-3" />

        {selectedShow ? (
          <>
            <Typography.Title level={4}>Selected</Typography.Title>
            <MoviePageShowInfo show={selectedShow} layout="horizontal" colNumber={3} />
            <Row type="flex" justify="end">
              <Button type="default" onClick={onDeselect} className="mt-3">
                Select another show
              </Button>
            </Row>
          </>
        ) : (
          <>
            {data && (
              <Table dataSource={data} loading={loading} pagination={false} rowKey="id" className="table">
                <Table.Column
                  key="date"
                  render={(text, record: IShowModel) => <DateFormatter format="Do MMM" date={record.startDateTime} />}
                />
                <Table.Column
                  key="time"
                  render={(text, record: IShowModel) => (
                    <>
                      <DateFormatter format="HH:mm" date={record.startDateTime} /> -{' '}
                      <DateFormatter format="HH:mm" date={record.endDateTime} />
                    </>
                  )}
                />
                <Table.Column key="title" title="Movie" dataIndex="movie.title" />
                <Table.Column
                  key="address"
                  title="Cinema, Address, Room"
                  render={(text, record: IShowModel) => (
                    <>
                      <span>«{record.theater.name}», </span>
                      <span>{record.theater.address}, </span>
                      <span>Room: {record.room.number}</span>
                    </>
                  )}
                />
                <Table.Column
                  key="actions"
                  render={(text: string, record: IShowModel) => (
                    <Button type="primary" onClick={() => onSelect(record)}>
                      Select
                    </Button>
                  )}
                />
              </Table>
            )}
          </>
        )}
      </div>
    );
  }
}

export const MoviePageShowsList = communicationShows.injector(MoviePageTheatersListComponent);
