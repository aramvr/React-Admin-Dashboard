import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="footer">
        <span>Version 1.0.0</span>
      </div>
    );
  }
}

export default Footer;
