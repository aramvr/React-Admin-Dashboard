import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Auth from '../../api/auth';

const FormItem = Form.Item;

class editUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      edited: false,
      username: '',
      email: '',
      nickname: '',
    };
  }
  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 0);
    Auth.getUserById(id, (data) => {
      this.setState({
        username: data.username,
        email: data.email,
        nickname: data.nickname,
      });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values.password);

        if (!values.password) {
          console.log('hes');
          delete values.password;
        }
        const { id } = this.props.match.params;
        Auth.editUser(id, values, () => {
          this.setState({
            edited: true,
          });
        });
      }
    });
  };
  deleteUser = () => {
    const { id } = this.props.match.params;
    Auth.deleteUser(id, () => {
      this.setState({
        edited: true,
      });
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
    const { username, email, nickname } = this.state;

    const { edited } = this.state;
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
    if (edited) {
      return <Redirect to="/users/" />;
    }
    return (
      <div className="defaultContent">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label={<span>Edit Username</span>}>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
              initialValue: username,
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
              initialValue: email,
              autocomplete: 'off',
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Nickname</span>}>
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              initialValue: nickname,
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: false,
                  message: 'Please input your password!',
                },
              ],
            })(<Input type="password" />)}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </FormItem>
          <Button type="danger" onClick={this.deleteUser}>
            Delete User
          </Button>
        </Form>
      </div>
    );
  }
}

export default Form.create()(editUser);
