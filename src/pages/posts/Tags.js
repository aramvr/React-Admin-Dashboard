import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TaxonomyLayout from '../../components/TaxonomyLayout';

const POST_TYPE_NAME = 'posts';
const TAX_TYPE_NAME = 'tags';

class postTags extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text, i) => <Link to={`/${POST_TYPE_NAME}/${i.id}`}>{text}</Link>,
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Slug',
        dataIndex: 'slug',
      },
      {
        title: 'Count',
        dataIndex: 'count',
        sorter: (a, b) => a.count.length - b.count.length,
      },
    ];

    return (
      <div>
        <TaxonomyLayout
          title="Tags"
          taxTypeName={TAX_TYPE_NAME}
          postTypeName={POST_TYPE_NAME}
          parentDropdown={false}
          columns={columns}
        />
      </div>
    );
  }
}
export default postTags;
