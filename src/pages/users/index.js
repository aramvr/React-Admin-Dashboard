import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TableList from '../../components/TableList';
import Auth from '../../api/auth';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    Auth.getUsers((users) => {
      const data = users.map(user => ({ ...user, key: user.id }));
      this.setState({
        data,
      });
    });
  }

  render() {
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        render: (text, i) => <Link to={`/users/${i.id}`}>{text}</Link>,

        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.username.indexOf(value) === 0,
        sorter: (a, b) => a.username.length - b.username.length,
      },
      {
        title: 'Nickname',
        dataIndex: 'nickname',
        sorter: (a, b) => a.nickname - b.nickname,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        onFilter: (value, record) => record.email.indexOf(value) === 0,
        sorter: (a, b) => a.email.length - b.email.length,
      },
      {
        title: 'Role',
        dataIndex: 'role',
        onFilter: (value, record) => record.role.indexOf(value) === 0,
        sorter: (a, b) => a.role.length - b.role.length,
      },
    ];

    return (
      <div className="defaultContent">
        <TableList columns={columns} data={this.state.data} />
      </div>
    );
  }
}

export default Users;
