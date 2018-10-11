import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Auth from '../../api/auth';

const FormItem = Form.Item;

class addUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      added: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Auth.addUser(values, () => {
          this.setState({
            added: true,
          });
        });
      }
    });
  };
  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { added } = this.state;
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
    if (added) {
      return <Redirect to="/users/" />;
    }
    return (
      <div className="defaultContent">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label={<span>Username</span>}>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
            })(<Input name="username" />)}
          </FormItem>
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
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(addUser);
