import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import optionsApi from '../../api/optionsApi';

const FormItem = Form.Item;

class generalSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site_title: '',
      site_tagline: '',
      site_email: '',
      site_registration: false,
    };
  }
  componentDidMount() {
    this.getSettings();
  }
  onCheck = (e) => {
    this.setState({
      site_registration: e.target.checked,
    });
  };

  getSettings() {
    optionsApi.getOptions((data) => {
      this.setState(data);
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
    const {
      site_title, site_tagline, site_email, site_registration,
    } = this.state;
    return (
      <div className="">
        <h1>General Settings</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label={<span>Site Title</span>}>
            {getFieldDecorator('site_title', {
              rules: [{ required: true, message: 'Please input Site Title', whitespace: true }],
              initialValue: site_title,
            })(<Input name="site_title" />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Site Tagline</span>}>
            {getFieldDecorator('site_tagline', {
              rules: [{ required: false }],
              initialValue: site_tagline,
            })(<Input name="site_tagline" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Admin E-mail">
            {getFieldDecorator('site_email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
              initialValue: site_email,
            })(<Input autoComplete="email" />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Enable Registration</span>}>
            {getFieldDecorator('site_registration', {
              rules: [{ required: false }],
            })(<Checkbox onChange={this.onCheck} checked={site_registration}>
                Anyone can register
            </Checkbox>)}
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

export default Form.create()(generalSettings);
