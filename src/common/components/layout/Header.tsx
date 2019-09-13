import { Layout } from 'antd';
import React, { Component } from 'react';

class HeaderComponent extends Component {
  render() {
    return (
      <Layout.Header>
        <div style={{ color: '#fff', fontWeight: 'bold' }}>CinemaGo!</div>
      </Layout.Header>
    );
  }
}

export const Header = HeaderComponent;
