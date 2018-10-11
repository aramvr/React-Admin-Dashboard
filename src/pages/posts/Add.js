import React from 'react';
import PostLayout from '../../components/PostLayout';
import postTypes from '../../postTypes';

class addPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <PostLayout {...this.props} postTypeConf={postTypes.posts} />;
  }
}
export default addPost;
