import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import Auth from '../api/auth';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    this.setState({
      isAuthenticated: Auth.isAuthenticated,
    });
  }

  inputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  login = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    Auth.authenticate(data, (response) => {
      console.log(response);
      this.setState(() => ({
        isAuthenticated: response,
      }));
    });
  };

  render() {
    const { isAuthenticated } = this.state;

    if (isAuthenticated === true) {
      return <Redirect to="dashboard" />;
    }
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-form-container">
        <div className="login-box">
          <div className="login-logo">
            <img src="/assets/img/logo.png" alt="" />
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              <label htmlFor="username">
                Username or Email<Input name="username" onChange={e => this.inputChange(e)} />
              </label>
            </FormItem>
            <FormItem>
              <label htmlFor="password">
                Password<Input
                  name="password"
                  type="password"
                  onChange={e => this.inputChange(e)}
                />
              </label>
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox className="remember-me">Remember me</Checkbox>)}
              <Button
                onClick={this.login}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </FormItem>
          </Form>
          <div className="login-links">
            <Link className="login-form-forgot" to="/">
              Lost your password?
            </Link>
            <br />
            <Link to="/">Create an account now</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
