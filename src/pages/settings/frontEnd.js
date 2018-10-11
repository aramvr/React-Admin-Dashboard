import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import optionsApi from '../../api/optionsApi';

const FormItem = Form.Item;
const Option = Select.Option;

class frontEndSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text_logo: '',
      site_style: '',
    };
  }
  componentDidMount() {
    this.getSettings();
  }

  getSettings() {
    optionsApi.getOptions((data) => {
      this.setState(data);
      console.log(data);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        optionsApi.saveOptions(values, () => console.log(values));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 18,
          offset: 5,
        },
      },
    };
    const { text_logo, site_style } = this.state;
    return (
      <div className="">
        <h1>Front-end Settings</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label={<span>Text logo</span>}>
            {getFieldDecorator('text_logo', {
              rules: [{ required: true, message: 'Please input Site Title', whitespace: true }],
              initialValue: text_logo,
            })(<Input name="text_logo" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Select">
            {getFieldDecorator('site_style', {
              rules: [{ required: true, message: 'Please select site Style' }],
              initialValue: site_style,
            })(<Select placeholder="Please select a style">
              <Option value="blue">Blue</Option>
              <Option value="red">Red</Option>
            </Select>)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(frontEndSettings);
