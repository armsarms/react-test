import React, { Component } from 'react';
import axios from 'axios';
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
        const { form: { username, password } } = this.state;
        if (!username.valid || !password.valid ) {
            console.log('请填写正确的信息后重试');
            return;
        }
        axios.post('http://localhost:3000/user'
            , {
                username: username.value,
                password: password.value
            }
        ).then(function (res) {
            console.log(res);
            if (res.status == '201') {
                console.log('OJBK');
            }
        })
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
                    <button onClick={this.handleSubmit}>提交</button>
                </form>
            </div>
        );
    }
}

export default Form;