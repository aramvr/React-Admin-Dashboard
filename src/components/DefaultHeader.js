import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { Redirect } from 'react-router-dom';

import Auth from '../api/auth';

const { SubMenu } = Menu;
const { Header } = Layout;

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
    };
  }
  logout = () => {
    Auth.signout();
    this.setState({
      isAuthenticated: false,
    });
  };
  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect to="login" />;
    }
    return (
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Icon type="admin-icon" />
          </Menu.Item>
          <Menu.Item key="2">View the Website</Menu.Item>
          <Menu.Item key="3">
            <Icon type="plus" /> Add
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="message" /> 3
          </Menu.Item>
          <SubMenu
            className="right-align"
            key="5"
            title={
              <span>
                Hi admin <Icon type="user" />
              </span>
            }
          >
            <Menu.Item key="sub3-1">Edit my Profile</Menu.Item>
            <Menu.Item key="sub3-2" onClick={this.logout}>
              Log Out
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

export default DefaultHeader;
