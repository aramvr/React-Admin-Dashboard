import React from 'react';
import { Table, Select } from 'antd';
import postType from '../api/postType';

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      bulkAction: '',
    };
  }

  componentDidMount() {
    const { postTypeName, listType } = this.props;
  }

  render() {
    const { columns, data } = this.props;

    return (
      <div>
        <Table rowSelection={this.props.rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}
export default TableList;
