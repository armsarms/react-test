import React, { Component } from 'react';
import axios from 'axios';
class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['']
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/user').then(function (res) {
            this.setState({ list: res.data })
            // console.log(this.state.list);
            // console.log(this.state.list[1]);
        }.bind(this))
    }
    handleEdit(li) {
        // var data = { id: li.id, username: li.username, password: li.password };
        var data = {
            username: {
                valid: true,
                value: li.username,
                error: ''
            },
            password: {
                valid: true,
                value: li.password,
                error: ''
            }
        };
        var path = {
            pathname: '/3/'+li.id,
            state: data,
        }
        this.props.history.push(path)
    }
    handleDel(li) {
        axios.delete('http://localhost:3000/user/' + li.id).then(function (res) {
            this.setState({ list: this.state.list.filter(item => item.id !== li.id) })
            // console.log(res);               
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const lists = this.state.list;//important
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>用户名：</th>
                            <th>用户密码：</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists.map((list) =>
                            (
                                <tr key={list.id} className="userList">
                                    <td>
                                        {list.username}
                                    </td>
                                    <td>
                                        {list.password}
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" onClick={() => this.handleEdit(list)}>编辑</a>
                                        &nbsp;
                                        <a href="javascript:void(0)" onClick={() => this.handleDel(list)}>删除</a>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>


            </div>
        );
    }
}
UserList.contextTypes = {
    router: Object
};
export default UserList;
