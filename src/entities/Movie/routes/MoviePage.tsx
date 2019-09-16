import { Button, Card, Col, Descriptions, Divider, PageHeader, Row, Spin, Statistic, Typography } from 'antd';
import { ERoutes } from 'common/enums/Routes.enum';
import { MoviePageBooking, MoviePageInfo, MoviePageShowsList } from 'entities/Movie/components';
import { IShowModel } from 'entities/Shows/Shows.models';
import { RouteComponentProps } from 'react-router';
import { communicationMovie, IMovieConnectedProps } from 'entities/Movie/Movie.communication';
import React, { Component } from 'react';

interface IComponentState {
  selectedShow?: IShowModel;
}

type AllProps = RouteComponentProps & IMovieConnectedProps;

class MoviePageComponent extends Component<AllProps, IComponentState> {
  constructor(props) {
    super(props);

    this.state = { selectedShow: undefined };
  }

  componentDidMount(): void {
    const { getMovieModel } = this.props;
    const { id } = this.props.match.params;

    getMovieModel(id);
  }

  render() {
    const { movieModel } = this.props;
    const { selectedShow } = this.state;
    const { data, loading } = movieModel;

    if (loading || !data) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      );
    }

    const { title } = data;

    return (
      <>
        <PageHeader title={title} onBack={this.onBack} className="pl-0" />
        <Card bordered={true}>
          <MoviePageInfo movie={data} />
          <Divider />
          <MoviePageShowsList
            movie={movieModel.data}
            onSelect={this.onSelectShow}
            onDeselect={this.onDeselectShow}
            selectedShow={selectedShow}
          />
          {selectedShow && <MoviePageBooking movie={movieModel.data} selectedShow={selectedShow} />}
        </Card>
      </>
    );
  }

  onBack = () => {
    const { history } = this.props;

    history.push(`/${ERoutes.Movies}`);
  };

  onSelectShow = (show: IShowModel) => {
    this.setState({
      selectedShow: show
    });
  };

  onDeselectShow = () => {
    this.setState({
      selectedShow: undefined
    });
  };
}

export const MoviePage = communicationMovie.injector(MoviePageComponent);
