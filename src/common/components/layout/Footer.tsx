import { Layout } from 'antd';
import React, { Component } from 'react';

class FooterComponent extends Component {
  render() {
    return (
      <Layout.Footer>
        <p className="text--center">
          CinemaGo Created with ❤ by{' '}
          <a href="https://github.com/kastamas" target="_blank">
            mikxsid
          </a>{' '}
          for{' '}
          <a href="https://www.valamis.com/" target="_blank">
            VALAMIS
          </a>{' '}
          ©2019
        </p>
      </Layout.Footer>
    );
  }
}

export const Footer = FooterComponent;
