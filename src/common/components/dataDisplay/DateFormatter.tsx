import moment from 'moment';
import React, { Component } from 'react';

interface IComponentProps {
  date?: string;
  format?: string;
}

class DateComponent extends Component<IComponentProps> {
  render() {
    const { date, format } = this.props;
    const defaultFormat = '';

    if (!date) {
      return <span>-</span>;
    }

    return <span>{moment(date).format(format || defaultFormat)}</span>;
  }
}

export const DateFormatter = DateComponent;
