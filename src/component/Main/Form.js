import React, { Component } from 'react';
import axios from 'axios';
import { put, post } from '../../utils/request'

// import { Router, Route, BrowserRouter } from 'react-router-dom';
// import PropTypes from 'react-prop-types';
// import { browserHistory } from 'react-router'
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: {
                    valid: false,
                    value: '',
                    error: ''
                },
                password: {
                    valid: false,
                    value: '',
                    error: ''
                }
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValueChange(name, value, event) {
        // this.setState(n)
        const { form } = this.state;
        const newFieldObj = { value: value, valid: true, error: '' };
        switch (name) {
            case 'username': {
                if (value.length >= 10) {
                    newFieldObj.error = '用户名最多10个字符';
                    newFieldObj.valid = false;
                } else if (value.length === 0) {
                    newFieldObj.error = '请输入用户名';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'password': {
                // var reg = new RegExp("\^[/u4E00-/u9FA5]+$\");
                if (value.length >= 20) {
                    newFieldObj.error = '密码最多20个字符';
                    newFieldObj.valid = false;
                }
                //   else if (reg.test(value)) {
                //     newFieldObj.error = '不能含有汉字';
                //     newFieldObj.valid = false;
                //   }
                break;
            }
        }

        this.setState({
            form: { ...form, [name]: newFieldObj }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        const { form: { username, password } } = this.state;
        let PropUrl = 'http://localhost:3000/user';
        let method = post;
        // const {form: {name, age, gender}, formValid, editTarget} = this.props;
        if (!username.valid || !password.valid) {
            console.log('请填写正确的信息后重试');
            return;
        }
        console.log(id);
        
        if (id) {
            PropUrl = 'http://localhost:3000/user/' + id;
            method = put;
        }

        method(
            PropUrl,
            {
                username: username.value,
                password: password.value
            }
        ).then(function (res) {
            console.log(res);
            this.props.history.push('/4')//important
            if (res.status == '201') {
                console.log('OJBK');
            }
        }.bind(this)).catch(function (error) {
            console.log(error);
            this.props.history.push('/login')
          }.bind(this));
    }
    componentDidMount() {
        // 来自于路径 `/inbox/messages/:id`
        // const id = this.props.match.params.id //params 传值
        const data = this.props.location.state; //state 传值
        // console.log(data);
        if (data) {
            this.setState({
                form: data
            });
        }

    }
    render() {
        const { form: { username, password } } = this.state;
        return (
            <div>
                <form>
                    <label htmlFor="username">用户名字</label>
                    <input type="text" value={username.value} name='username' onChange={(e) => this.handleValueChange('username', e.target.value)} />
                    <label htmlFor="password">用户密码</label>
                    <input type="password" value={password.value} name='password' onChange={(e) => this.handleValueChange('password', e.target.value)} />
                    <button onClick={(e) => this.handleSubmit(e)}>提交</button>
                </form>
            </div>
        );
    }
}
// Form.contextTypes={
//     router: React.PropTypes.object.isRequired
// }
export default Form;