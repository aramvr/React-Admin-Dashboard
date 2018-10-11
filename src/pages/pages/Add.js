import React from 'react';
import PostLayout from '../../components/PostLayout';
import postTypes from '../../postTypes';

class addPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <PostLayout {...this.props} postTypeConf={postTypes.pages} />;
  }
}
export default addPages;
