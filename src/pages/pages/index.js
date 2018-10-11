import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostTableList from '../../components/PostTableList';

import postType from '../../api/postType';

const POST_TYPE_NAME = 'pages';
class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getPages = this.getPages.bind(this);
  }
  componentWillMount() {
    this.getPages();
  }

  async getPages() {
    await postType.getPosts(POST_TYPE_NAME, (posts) => {
      const data = posts.map(post => ({ ...post, key: post.id }));
      this.setState({
        data,
      });
    });
  }
  render() {
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        render: (text, i) => <Link to={`/${POST_TYPE_NAME}/${i.id}`}>{text}</Link>,
        sorter: (a, b) => a.title.length - b.title.length,
      },
      {
        title: 'Author',
        dataIndex: 'author',
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        sorter: (a, b) => a.date.length - b.date.length,
      },
    ];
    return (
      <PostTableList
        listType="posts"
        postTypeName={POST_TYPE_NAME}
        title="Posts"
        columns={columns}
        data={this.state.data}
        update={this.getPages}
        hideCategories
      />
    );
  }
}

export default Pages;
