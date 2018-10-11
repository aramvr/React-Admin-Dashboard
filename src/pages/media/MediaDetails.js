import React, { Component } from 'react';
import { Button, Modal, Icon, Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

import postTypes from '../../postTypes';
import postType from '../../api/postType';

const FormItem = Form.Item;

class MediaDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { id } = this.props.item;
        postType.editPost(id, values, 'attachment', () => {
          this.props.onSave();
          this.props.onCancel();
        });
      }
    });
  };

  deleteMedia = () => {
    const { id } = this.props.item;

    postType.deletePost(id, () => {
      this.props.onSave();
      this.props.onCancel();
    });
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const { getFieldDecorator } = this.props.form;

    const { show, item, onCancel } = this.props;
    const size = Math.floor(item.size / 1000) || 0;
    const date = moment(item.date).format('D MMM, Y');
    return (
      <Modal
        className="fullscreenModal"
        visible={show}
        title="Attachment details"
        footer={[
          <Button key="delete" style={{ float: 'left' }} type="danger" onClick={this.deleteMedia}>
            Delete Attachment
          </Button>,
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleSubmit}>
            Save
          </Button>,
        ]}
        onOk={this.handleOk}
        onCancel={onCancel}
      >
        <Row>
          <Col span={14}>
            <img alt="" className="bigImage" src={item.url} />
          </Col>
          <Col span={10} className="editImageSection">
            <div className="mediaFileInfo">
              <p>
                <b>File name: </b>
                {item.name}
              </p>
              <p>
                <b>Uploaded on: </b>
                {date}
              </p>
              <p>
                <b>File type: </b>
                {item.type}
              </p>
              <p>
                <b>File size: </b>
                {`${size} KB`}
              </p>
              <p>
                <b>Dimensions: </b>
                {`${item.width} x ${item.height}`}
              </p>
            </div>

            <hr />
            <br />
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label={<span>Url</span>}>
                {getFieldDecorator('url', {
                  rules: [{ required: false }],
                  initialValue: item.url,
                })(<Input disabled />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<span>Name</span>}>
                {getFieldDecorator('name', {
                  rules: [{ required: false }],
                  initialValue: item.name,
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<span>Caption</span>}>
                {getFieldDecorator('caption', {
                  rules: [{ required: false }],
                  initialValue: item.caption,
                })(<Input.TextArea rows={3} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<span>Alt text</span>}>
                {getFieldDecorator('alt', {
                  rules: [{ required: false }],
                  initialValue: item.alt,
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<span>Description</span>}>
                {getFieldDecorator('description', {
                  rules: [{ required: false }],
                  initialValue: item.description,
                })(<Input.TextArea rows={3} />)}
              </FormItem>
            </Form>
          </Col>
        </Row>
      </Modal>
    );
  }
}
export default Form.create()(MediaDetails);
