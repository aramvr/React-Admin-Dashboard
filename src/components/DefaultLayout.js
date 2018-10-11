import React from 'react';
import { Layout, Menu, Icon } from 'antd';

import { Redirect, Route, Switch, Link } from 'react-router-dom';
import routes from '../routes';

import DefaultHeader from './DefaultHeader';
import Footer from './Footer';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class DefaultLayout extends React.Component {
  state = {
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <DefaultHeader />
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu theme="dark" mode="vertical" style={{ height: '100%', borderRight: 0 }}>
              {routes.navBarItems.map((route, id: number) =>
                  route.visible !== false &&
                  (!route.submenu ? (
                    <Menu.Item key={id}>
                      <Link to={route.path}>
                        <Icon type={route.icon} /> {route.name}
                      </Link>
                    </Menu.Item>
                  ) : (
                    <SubMenu
                      key={id}
                      title={
                        <Link to={route.path}>
                          <Icon type={route.icon} /> {route.name}
                        </Link>
                      }
                    >
                      {route.submenu.map((submenu, subId: number) => (
                        <Menu.Item key={subId}>
                          <Link to={submenu.path}>{submenu.name}</Link>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  )))}
            </Menu>
          </Sider>
          <Layout className="defaultLayout">
            <Content>
              <Switch>
                {routes.routes.map((route, id: number) =>
                    (route.component ? (
                      <Route
                        key={id}
                        path={route.path}
                        exact={route.exact}
                        props={route.props}
                        render={props => <route.component names={route.names} {...props} />}
                      />
                    ) : null))}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default DefaultLayout;
