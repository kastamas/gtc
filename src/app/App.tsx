import { Layout } from 'antd';
import { Body } from 'common/components/layout/Body';
import { Footer } from 'common/components/layout/Footer';
import { Header } from 'common/components/layout/Header';
import React, { Component } from 'react';

class AppComponent extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Body />
        <Footer></Footer>
      </Layout>
    );
  }
}

export const App = AppComponent;
