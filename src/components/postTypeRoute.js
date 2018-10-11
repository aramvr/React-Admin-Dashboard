import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class PostTypeRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { key, route } = this.props;
    console.log(this.props.route);
    return (
      <div>
        <Route
          key={key}
          path={route.path}
          exact={route.exact}
          render={props => <route.component route={route} {...props} />}
        />
        {route.submenu.map((subroute, id) =>
            (subroute.component ? (
              <Route
                key={id}
                path={subroute.path}
                exact={subroute.exact}
                render={props => <subroute.component route={route} {...props} />}
              />
            ) : null))}
      </div>
    );
  }
}
export default PostTypeRoute;
