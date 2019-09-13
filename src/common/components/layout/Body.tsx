import { Layout } from 'antd';
import { MoviesListPage } from 'entities/Movie/routes/MoviesListPage';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class ContentComponent extends Component {
  render() {
    return (
      <Layout.Content style={{ padding: '24px 50px' }}>
        <Switch>
          <Route path={`/`} component={MoviesListPage} />
        </Switch>
      </Layout.Content>
    );
  }
}

export const Body = ContentComponent;
