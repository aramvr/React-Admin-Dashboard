import React from 'react';
import PostLayout from '../../components/PostLayout';
import postTypes from '../../postTypes';

class addMedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addMediaVisible: true,
    };
  }
  showModal = () => {
    this.setState({
      addMediaVisible: true,
    });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      addMediaVisible: false,
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      addMediaVisible: false,
    });
  };
  render() {
    return (
      
    );
  }
}
export default addMedia;
