import React, { Component } from 'react';

import { Form, Input, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 18,
          offset: 6,
        },
      },
    };

    return (
      <div className="defaultContent">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password">
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Nickname</span>}>
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(UserProfile);
