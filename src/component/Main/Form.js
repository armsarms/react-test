import React, { Component } from 'react';
import axios from 'axios';
import { Router, Route, BrowserRouter } from 'react-router-dom';
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
        const { form: { username, password } } = this.state;
        const url = 'http://localhost:3000/user';
        const method = 'post';
        // const {form: {name, age, gender}, formValid, editTarget} = this.props;
        if (!username.valid || !password.valid ) {
            console.log('请填写正确的信息后重试');
            return;
        }
        // if(props){
        //     url = 'http://localhost:3000/user/' +prop.id;
        // }
        axios({
            method: method,
            url: url,
            data: {
                username: username.value,
                password: password.value
            }
          }).then(function (res) {
            console.log(res);
            if (res.status == '201') {
                console.log('OJBK');
                this.props.history.push('/4')//important
                // browserHistory.push('/4')
                // this.context.router.push('/4');
            }
        }.bind(this))
    }
    // componentWillMount () {
    //     const {editTarget, setFormValues} = this.props;
    //     if (editTarget) {
    //       setFormValues(editTarget);
    //     }
    //   }
    componentDidMount() {
        // 来自于路径 `/inbox/messages/:id`
        const id = this.props.match.params.id
        console.log(
            id
        );
        
      }
    render() {
        // const userId = this.context.router.route.match.params.id;
        console.log(this.props.params);
        const { form: { username, password } } = this.state;
        return (
            <div>
                <form>
                    <label htmlFor="username">用户名字</label>
                    <input type="text" value={username.value} name='username' onChange={(e) => this.handleValueChange('username', e.target.value)} />
                    <label htmlFor="password">用户密码</label>
                    <input type="password" value={password.value} name='password' onChange={(e) => this.handleValueChange('password', e.target.value)} />
                    <button onClick={(e)=>this.handleSubmit(e)}>提交</button>
                </form>
            </div>
        );
    }
}
// Form.contextTypes={
//     router: React.PropTypes.object.isRequired
// }
export default Form;