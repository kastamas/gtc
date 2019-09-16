import { Alert, Button, Row, Table, Typography } from 'antd';
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
          <Button type="default" onClick={onDeselect}>
            Select another show
          </Button>
        ) : (
          <>
            {data && (
              <Table dataSource={data} loading={loading} pagination={false}>
                <Table.Column title="Start time - end time" dataIndex="startDateTime" />
                <Table.Column title="Movie" dataIndex="movie.title" />
                <Table.Column title="Theater" dataIndex="theater.name" />
                <Table.Column title="Theater" dataIndex="theater.address" />
                <Table.Column title="Theater" dataIndex="theater.address" />
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
