import React from 'react';
import { post } from '../../utils/request'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {
                account: {
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

    handleSubmit(e) {
        e.preventDefault();

        const { form: { account, password } } = this.state;
        // if (!formValid) {
        //     alert('请输入账号或密码');
        //     return;
        // }

        post('http://localhost:3000/login', {
            account: account.value,
            password: password.value
        }).then(function (res) {
            if (res) {
                this.props.history.push('/');
            } else {
                alert('登录失败，账号或密码错误');
            }
        }.bind(this))
    }
    handleValueChange(name, value, event) {
        // this.setState(n)
        const { form } = this.state;
        const newFieldObj = { value: value, valid: true, error: '' };
        switch (name) {
            case 'account': {
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

    render() {
        const { form: { account, password }, onFormChange } = this.state;
        return (
            <div>
                <h1>请登录</h1>
                <form>
                    <label htmlFor="username">用户名字</label>
                    <input type="text" value={account.value} name='username'  onChange={e => this.handleValueChange('account', e.target.value)} />
                    <label htmlFor="password">用户密码</label>
                    <input type="password" value={password.value} name='password' onChange={e => this.handleValueChange('password', e.target.value)} />
                    <button onClick={(e) => this.handleSubmit(e)}>提交</button>
                </form>
            </div>
            // <HomeLayout title="请登录">
            //     <form onSubmit={this.handleSubmit}>
            //         <FormItem label="账号：" valid={account.valid} error={account.error}>
            //             <input type="text" value={account.value} onChange={e => onFormChange('account', e.target.value)} />
            //         </FormItem>
            //         <FormItem label="密码：" valid={password.valid} error={password.error}>
            //             <input type="password" value={password.value} onChange={e => onFormChange('password', e.target.value)} />
            //         </FormItem>
            //         <br />
            //         <input type="submit" value="登录" />
            //     </form>
            // </HomeLayout>
    );
    }
}

// Login.contextTypes = {
//     router: React.PropTypes.object.isRequired
// };

// Login = formProvider({
//     account: {
//         defaultValue: '',
//         rules: [
//             {
//                 pattern(value) {
//                     return value.length > 0;
//                 },
//                 error: '请输入账号'
//             }
//         ]
//     },
//     password: {
//         defaultValue: '',
//         rules: [
//             {
//                 pattern(value) {
//                     return value.length > 0;
//                 },
//                 error: '请输入密码'
//             }
//         ]
//     }
// })(Login);

export default Login;