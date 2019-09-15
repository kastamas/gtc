import { Alert, Row, Typography } from 'antd';
import React, { Component } from 'react';

class MoviePageTheatersListComponent extends Component {
  render() {
    return (
      <div>
        <Typography.Title level={4}>Program and tickets</Typography.Title>
        <Alert type="info" message="Click on the time which suits you" closable={true} />
      </div>
    );
  }
}

export const MoviePageTheatersList = MoviePageTheatersListComponent;
