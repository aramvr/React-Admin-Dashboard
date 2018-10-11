import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostTableList from '../../components/PostTableList';
import postType from '../../api/postType';

const POST_TYPE_NAME = 'posts';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getPosts = this.getPosts.bind(this);
  }
  componentWillMount() {
    this.getPosts();
  }
  async getPosts() {
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
        title: 'Categories',
        dataIndex: 'categories',
        render: categories => (categories ? categories.join(', ') : ''),
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
        taxTypeName="categories"
        postTypeName={POST_TYPE_NAME}
        title="Posts"
        columns={columns}
        data={this.state.data}
        update={this.getPosts}
      />
    );
  }
}

export default Posts;
