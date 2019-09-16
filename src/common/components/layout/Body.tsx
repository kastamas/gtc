import { Col, Layout, Row } from 'antd';
import { ERoutes } from 'common/enums/Routes.enum';
import { MoviePage } from 'entities/Movie/routes';
import { MoviesListPage } from 'entities/Movie/routes/MoviesListPage';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

class ContentComponent extends Component {
  render() {
    return (
      <Layout.Content className={'body'}>
        <Row type={'flex'} justify={'center'}>
          <Col xs={24} sm={24} md={22} lg={20} xl={18} xxl={16}>
            <Switch>
              <Route path={`/${ERoutes.Movies}`} component={MoviesListPage} exact />
              <Route path={`/${ERoutes.Movies}/:id`} component={MoviePage} />
              <Route path={`/`} component={MoviesListPage} />
            </Switch>
          </Col>
        </Row>
      </Layout.Content>
    );
  }
}

export const Body = ContentComponent;
