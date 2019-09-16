import { Button, Col, Descriptions, Divider, Form, Input, Modal, Row, Typography } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { DateFormatter } from 'common/components/dataDisplay';
import { MoviePageSelectedSeatsInfo } from 'entities/Movie/components/MoviePageSelectedSeatsInfo';
import { MoviePageShowInfo } from 'entities/Movie/components/MoviePageShowInfo';
import { IMovieModel } from 'entities/Movie/Movie.models';
import { IShowModel } from 'entities/Shows/Shows.models';
import { ISeatModel } from 'entities/Theater/Theater.models';
import React, { Component } from 'react';

interface IComponentProps {
  isDisplaying: boolean;
  selectedShow: IShowModel;
  selectedSeats: ISeatModel[];
  onToggleModal: () => void;
  onConfirmPayment: (values: { email: string }) => void;
}

interface CustomerDetailsFormProps extends FormComponentProps {
  email: string;
}

type AllProps = IComponentProps & FormComponentProps;

class MoviePagePurchaseModalComponent extends Component<AllProps> {
  render() {
    const { isDisplaying, onToggleModal, selectedShow, selectedSeats, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal visible={isDisplaying} title={'Please, check your order'} footer={null} onCancel={onToggleModal}>
        <Row>
          <Col xs={12}>
            <Typography.Title level={4}>Show info</Typography.Title>
            <MoviePageShowInfo show={selectedShow} />
          </Col>
          <Col xs={12}>
            <MoviePageSelectedSeatsInfo selectedSeats={selectedSeats} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Typography.Title level={4}>Customer details</Typography.Title>
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'This field is required' }]
              })(<Input placeholder="example@email.com" type="email" />)}
              <br />
              <span>Enter your email address to receive the tickets</span>
            </Form.Item>

            <div className="mt-3">
              <Button type="primary" htmlType="submit">
                Confirm purchase
              </Button>
              <Button type="default" htmlType="button" className="ml-3" onClick={onToggleModal}>
                Cancel
              </Button>
            </div>
          </Form>
        </Row>
      </Modal>
    );
  }

  onSubmit = e => {
    const { form, onConfirmPayment } = this.props;

    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        onConfirmPayment(values);
      }
    });
  };
}

export const MoviePagePurchaseModal = Form.create<AllProps>({ name: 'customerDetails' })(MoviePagePurchaseModalComponent);
