import { Col, Icon, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';

import React, { Component } from 'react';

class HeaderComponent extends Component {
  render() {
    return (
      <Layout.Header className="header">
        <Row type={'flex'} justify={'center'}>
          <Col xs={24} sm={24} md={22} lg={20} xl={18} xxl={16}>
            <Link to="/">
              <div className="header__logo">
                <Icon type="video-camera" />
                <span className="ml-3">CinemaGo!</span>
              </div>
            </Link>
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

export const Header = HeaderComponent;
