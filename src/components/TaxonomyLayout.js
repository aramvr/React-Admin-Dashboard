import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Select } from 'antd';

import TableList from './TableList';
import postType from '../api/postType';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class TaxonomyLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    this.getTaxonomies();
  }

  onParentSelect = (value) => {
    this.setState({
      parent: value,
    });
  };
  getTaxonomies() {
    const { postTypeName, taxTypeName } = this.props;
    postType.getTaxonomies(postTypeName, taxTypeName, (Taxonomies) => {
      const data = Taxonomies.map(Taxonomy => ({ ...Taxonomy, key: Taxonomy.id }));
      data.map((cat) => {
        if (!cat.parentsCount) return cat;

        const Taxonomy = cat;
        let name = '';
        const childSymbol = '— ';
        for (let i = 0; i < cat.parentsCount; i += 1) {
          name += childSymbol;
        }
        Taxonomy.name = name + Taxonomy.name;
        return Taxonomy;
      });
      this.setState({
        data,
      });
    });
  }

  addTaxonomy = () => {
    const { postTypeName, taxTypeName } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = { parent: this.state.parent, ...values };
        postType.addTaxonomy(postTypeName, taxTypeName, data, () => {
          this.getTaxonomies();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { columns, parentDropdown } = this.props;
    return (
      <div>
        <h1>{this.props.title}</h1>
        <Row>
          <Col span={9}>
            <h2>Add New Taxonomy</h2>
            <div className="addPost">
              <Form layout="horizontal">
                <FormItem>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'This field is required!' }],
                  })(<Input placeholder="Name" />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('slug', {
                    rules: [{ required: false }],
                  })(<Input placeholder="Slug" />)}
                </FormItem>
                {parentDropdown ? (
                  <FormItem>
                    <Select
                      placeholder="Parent Taxonomy"
                      style={{ width: 200 }}
                      onChange={this.onParentSelect}
                      name="parent"
                    >
                      {this.state.data.map((Taxonomy, key) => (
                        <Option key={key} value={Taxonomy.id}>
                          {Taxonomy.name}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                ) : null}

                <FormItem>
                  {getFieldDecorator('description', {
                    rules: [{ required: false }],
                  })(<TextArea rows={5} placeholder="Description" />)}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" onClick={this.addTaxonomy}>
                    Add Taxonomy
                  </Button>
                </FormItem>
              </Form>
            </div>
          </Col>
          <Col offset={1} span={14}>
            <TableList columns={columns} data={this.state.data} />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create()(TaxonomyLayout);
