import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="defaultContent">
        <h1 className="App-title">Welcome to Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
