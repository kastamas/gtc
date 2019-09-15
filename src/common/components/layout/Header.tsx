import { Col, Icon, Layout, Row } from 'antd';
import React, { Component } from 'react';

class HeaderComponent extends Component {
  render() {
    return (
      <Layout.Header>
        <Row type={'flex'} justify={'center'}>
          <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>
            <div className="header">
              <Icon type="video-camera" />
              <span className="ml-3">CinemaGo!</span>
            </div>
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

export const Header = HeaderComponent;
