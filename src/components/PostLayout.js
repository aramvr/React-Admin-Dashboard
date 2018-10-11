import React from 'react';
import { Form, Input, Button, Row, Col, Card, Checkbox, Select } from 'antd';
import { Redirect } from 'react-router-dom';
import { DatePicker } from 'antd';
import moment from 'moment';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import postType from '../api/postType';

const Option = Select.Option;

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
let postId = 0;

class PostLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      content: '',
      title: '',
      categories: [],
      tags: [],
      date: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.form.validateFields();
    postId = parseInt(this.props.match.params.id, 0);
    this.setState({
      id: postId,
    });
    if (postId) {
      postType.getPostById(postId, (data) => {
        this.setState({
          ...data,
          date: moment(data.date),
        });
      });
    }
    this.getCategories();
    this.getTags();
  }
  onDateChange(value, dateString) {
    this.setState({
      date: dateString,
    });
  }

  getCategories() {
    const postTypeName = this.props.postTypeConf.postType;

    postType.getTaxonomies(postTypeName, 'categories', (categories) => {
      const data = categories.map(category => ({ ...category, key: category.id }));
      const cats = data.map(cat => ({
        label: cat.name,
        value: cat.id,
      }));
      this.setState({
        allCategories: cats,
      });
    });
  }
  getTags() {
    const postTypeName = this.props.postTypeConf.postType;
    postType.getTaxonomies(postTypeName, 'tags', (tags) => {
      const allTags = tags.map(tag => <Option key={tag.name}>{tag.name}</Option>);
      this.setState({
        allTags,
      });
    });
  }
  handleChange(value) {
    this.setState({ content: value });
  }

  addPost = () => {
    const postTypeName = this.props.postTypeConf.postType;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          content: this.state.content,
          ...values,
        };
        console.log('data ', data);
        if (!postId) {
          // add post
          postType.addPost(postTypeName, data, (res) => {
            this.setState({
              editing: true,
              ...res,
            });
          });
        } else {
          // edit post
          postType.editPost(postId, data, postTypeName, (res) => {});
        }
      }
    });
  };

  render() {
    const { postTypeConf } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {
      allCategories, categories, title, id, tags, allTags, editing, date,
    } = this.state;
    if (id && editing) return <Redirect to={`/${postTypeConf.name}/${id}`} />;

    return (
      <div className="addPost">
        <h1>
          {!id ? `Add New ${postTypeConf.SingularName}` : `Edit ${postTypeConf.SingularName}`}{' '}
        </h1>
        <Row>
          <Col span={17}>
            <Form layout="horizontal">
              <FormItem>
                {getFieldDecorator('title', {
                  rules: [{ required: false }],
                  initialValue: title,
                })(<Input placeholder="Enter title here" />)}
              </FormItem>
              <ReactQuill value={this.state.content} onChange={this.handleChange} />
            </Form>
          </Col>
          <Col className="postTools" span={7}>
            <Card title="Publish">
              <FormItem label="Publish Date">
                {getFieldDecorator('date', {
                  rules: [{ required: false }],
                  initialValue: date,
                })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select Time" />)}
              </FormItem>

              <br />
              <Button onClick={this.addPost} type="primary" className="add_post_button">
                {!id ? 'Publish' : 'Update'}
              </Button>
            </Card>
            {postTypeConf.taxonomies.includes('categories') ? (
              <Card title="Categories">
                <FormItem>
                  {getFieldDecorator('categories', {
                    rules: [{ required: false }],
                    initialValue: categories,
                  })(<CheckboxGroup className="categories" options={allCategories} />)}
                </FormItem>
              </Card>
            ) : null}
            {postTypeConf.taxonomies.includes('tags') ? (
              <Card title="Tags">
                <FormItem>
                  {getFieldDecorator('tags', {
                    rules: [{ required: false }],
                    initialValue: tags,
                  })(<Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode">
                    {allTags}
                  </Select>)}
                </FormItem>
              </Card>
            ) : null}

            <Card title="Thumbnail" />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create()(PostLayout);
