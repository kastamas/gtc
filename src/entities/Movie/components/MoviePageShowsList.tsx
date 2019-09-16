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
            <MoviePageShowInfo show={selectedShow} />
            <Button type="default" onClick={onDeselect}>
              Select another show
            </Button>
          </>
        ) : (
          <>
            {data && (
              <Table dataSource={data} loading={loading} pagination={false}>
                <Table.Column
                  render={(text, record: IShowModel) => <DateFormatter format="Do MMM" date={record.startDateTime} />}
                />
                <Table.Column
                  render={(text, record: IShowModel) => (
                    <div className="text--nowrap">
                      <DateFormatter format="HH:mm" date={record.startDateTime} /> -{' '}
                      <DateFormatter format="HH:mm" date={record.endDateTime} />
                    </div>
                  )}
                />
                <Table.Column title="Movie" dataIndex="movie.title" />
                <Table.Column
                  title="Theater, Address, Room"
                  render={(text, record: IShowModel) => (
                    <>
                      <span>«{record.theater.name}», </span>
                      <span>{record.theater.address}, </span>
                      <span>Room: {record.room.number}</span>
                    </>
                  )}
                />
                <Table.Column
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
