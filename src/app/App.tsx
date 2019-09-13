import { Layout } from 'antd';
import { Content } from 'common/components/layout/Content';
import { Footer } from 'common/components/layout/Footer';
import { Header } from 'common/components/layout/Header';
import React, { Component } from 'react';

class AppComponent extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Content />
        <Footer></Footer>
      </Layout>
    );
  }
}

export const App = AppComponent;
