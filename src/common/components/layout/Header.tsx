import { Icon, Layout } from 'antd';
import React, { Component } from 'react';

class HeaderComponent extends Component {
  render() {
    return (
      <Layout.Header>
        <div className="header">
          <Icon type="video-camera" />
          <span className="ml-3">CinemaGo!</span>
        </div>
      </Layout.Header>
    );
  }
}

export const Header = HeaderComponent;
