import { Layout } from 'antd';
import { ERoutes } from 'common/enums/Routes.enum';
import { MoviePage } from 'entities/Movie/routes';
import { MoviesListPage } from 'entities/Movie/routes/MoviesListPage';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class ContentComponent extends Component {
  render() {
    return (
      <Layout.Content className={'body'}>
        <Switch>
          <Route path={`/${ERoutes.Movies}`} component={MoviesListPage} exact />
          <Route path={`/${ERoutes.Movies}/:id`} component={MoviePage} />
          <Route path={`/`} component={MoviesListPage} />
        </Switch>
      </Layout.Content>
    );
  }
}

export const Body = ContentComponent;
