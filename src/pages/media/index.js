import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import postTypes from '../../postTypes';
import MediaDetails from './MediaDetails';
import postType from '../../api/postType';

class MediaLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      data: [],
      uploadingCount: 0,
    };
    this.addMedia = this.addMedia.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.getItems = this.getItems.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  async getItems() {
    const postTypeName = postTypes.attachment.postType;
    await postType.getPosts(postTypeName, (data) => {
      this.setState({
        data,
      });
    });
  }
  addMedia(e) {
    const postTypeName = postTypes.attachment.postType;
    console.log('addMedia: ', e);
    postType.uploadImage(e.file, (res) => {
      const data = {
        name: e.file.name,
        url: res.data.link,
        type: e.file.type,
        size: e.file.size,
        width: res.data.width,
        height: res.data.height,
      };
      postType.addPost(postTypeName, data, () => {
        this.getItems();
        const uploadingCount = this.state.uploadingCount - 1;
        this.setState({
          uploadingCount,
          loading: uploadingCount > 1,
        });
      });
    });
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = (info) => {
    console.log('info: ', info);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true, uploadingCount: info.fileList.length });
    }
  };

  selectItem(id) {
    console.log(id);
    const { data } = this.state;
    const previewImage = data.filter(image => image.id === id);
    this.setState({
      previewVisible: true,
      previewImage: previewImage[0],
    });
  }

  render() {
    const { previewVisible, previewImage, data } = this.state;

    return (
      <div>
        <h1>Media Library</h1>
        <br />
        <div className="clearfix">
          <div className="MediaLibrary">
            <Upload
              name="avatar"
              multiple
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={this.addMedia}
              onChange={this.handleChange}
            >
              <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
              </div>
            </Upload>
            {data.map(image => (
              <button
                className="thumbnail"
                key={image.id}
                onClick={() => this.selectItem(image.id)}
              >
                <img alt="" src={image.url} />
              </button>
            ))}
          </div>
          <MediaDetails
            key={previewImage.id}
            onCancel={this.handleCancel}
            onSave={this.getItems}
            show={previewVisible}
            item={previewImage}
          />
        </div>
      </div>
    );
  }
}

export default MediaLibrary;
