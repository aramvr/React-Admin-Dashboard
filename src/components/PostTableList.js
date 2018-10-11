import React from 'react';
import { Select, Button, Row, Col, Tabs, Input } from 'antd';
import postType from '../api/postType';
import TableList from '../components/TableList';
import { Link } from 'react-router-dom';

const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

const DELETE_ACTION = 'delete';
const MOVE_TO_TRASH_ACTION = 'trash';
const RESTORE_ACTION = 'restore';

class PostTableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedRowKeys: [],
      allData: [],
      data: [],
      bulkAction: 0,
    };
    this.onBulkApply = this.onBulkApply.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.getCategories();
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
    console.log(selectedRowKeys);
  };
  onBulkSelect = (bulkAction) => {
    console.log(bulkAction);
    this.setState({
      bulkAction,
    });
  };
  onCategorySelect = (category) => {
    this.setState({
      category,
    });
  };

  onBulkApply() {
    const { bulkAction, selectedRowKeys } = this.state;
    switch (bulkAction) {
      case DELETE_ACTION:
        postType.deletePosts(selectedRowKeys, (res) => {
          console.log(res);
          this.props.update().then(() => {
            this.getData();
          });
        });
        break;
      case RESTORE_ACTION:
        postType.restorePosts(selectedRowKeys, (res) => {
          console.log(res);
          this.props.update().then(() => {
            this.getData();
          });
        });
        break;
      case MOVE_TO_TRASH_ACTION:
        postType.trashPosts(selectedRowKeys, (res) => {
          console.log(res);
          this.props.update().then(() => {
            this.getData();
          });
        });
        break;
      default:
        break;
    }
  }
  onFilter() {
    const { category, allData } = this.state;
    if (!category) {
      this.resetFliter();
      return;
    }

    const filteredData = allData.filter(post => post.categories.includes(category));
    this.setState({ data: filteredData });
  }
  onTabChange() {
    this.setState({
      selectedRowKeys: [],
      bulkAction: 0,
    });
    console.log('sss');
  }

  onSearch = (searchText) => {
    if (!searchText) {
      this.resetFliter();
      return;
    }
    const reg = new RegExp(searchText, 'gi');
    const { data } = this.state;
    this.setState({
      data: data
        .map((record) => {
          const match = record.title.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            name: (
              <span>
                {record.title.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((text, i) =>
                    (text.toLowerCase() === searchText.toLowerCase() ? (
                      <span key={i} className="highlight">
                        {text}
                      </span>
                    ) : (
                      text
                    )), // eslint-disable-line
                )}
              </span>
            ),
          };
        })
        .filter(record => !!record),
    });
  };
  getData() {
    const { data } = this.props;

    this.setState({
      allData: data,
      data,
    });
  }

  getCategories() {
    const { postTypeName, taxTypeName } = this.props;
    postType.getTaxonomies(postTypeName, taxTypeName, (categories) => {
      this.setState({
        categories,
      });
    });
  }
  resetFliter() {
    const { allData } = this.state;
    this.setState({
      data: allData,
    });
  }
  render() {
    const {
      categories, selectedRowKeys, data, bulkAction,
    } = this.state;

    const published = data.filter(post => post.post_status !== 'trash');
    const trash = data.filter(post => post.post_status === 'trash');

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    const searchCol = (
      <Col span={5} style={{ float: 'right' }}>
        <Search placeholder="input search text" enterButton="Search" onSearch={this.onSearch} />
      </Col>
    );
    const { hideCategories } = this.props;

    const categoriesCol = !hideCategories ? (
      <Col span={5}>
        <Select
          defaultValue={0}
          style={{ width: 140, marginRight: 5 }}
          onChange={this.onCategorySelect}
        >
          <Option value={0}>All Categories</Option>
          {categories.map(cat => (
            <Option key={cat.id} value={cat.id}>
              {cat.name}
            </Option>
          ))}
        </Select>
        <Button onClick={this.onFilter}>Filter</Button>
      </Col>
    ) : null;

    return (
      <div>
        <h1 style={{ display: 'inline' }}>{this.props.title} </h1>{' '}
        <Link to="add">
          <Button>Add New</Button>
        </Link>
        <br />
        <br />
        <Tabs onChange={this.onTabChange} type="card">
          <TabPane tab="All" key="1">
            <div className="bulkActions">
              <Row>
                <Col span={5}>
                  <Select
                    defaultValue={bulkAction}
                    value={bulkAction}
                    style={{ width: 140, marginRight: 5 }}
                    onChange={this.onBulkSelect}
                  >
                    <Option value={0}>Bulk Actions</Option>
                    <Option value="trash">Move to trash</Option>
                  </Select>
                  <Button onClick={this.onBulkApply}>Apply</Button>
                </Col>
                {categoriesCol}
                {searchCol}
              </Row>
            </div>
            <TableList {...this.props} data={published} rowSelection={rowSelection} />
          </TabPane>
          <TabPane tab="Trash" key="2">
            <div className="bulkActions">
              <Row>
                <Col span={5}>
                  <Select
                    defaultValue={bulkAction}
                    value={bulkAction}
                    style={{ width: 140, marginRight: 5 }}
                    onChange={this.onBulkSelect}
                  >
                    <Option value={0}>Bulk Actions</Option>
                    <Option value="restore">Restore</Option>
                    <Option value="delete">Delete</Option>
                  </Select>
                  <Button onClick={this.onBulkApply}>Apply</Button>
                </Col>
                {categoriesCol}
                {searchCol}
              </Row>
            </div>
            <TableList {...this.props} data={trash} rowSelection={rowSelection} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default PostTableList;
