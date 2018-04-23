import React, { Component } from 'react';
import axios from 'axios';

// var CancelToken = axios.CancelToken;
// var source = CancelToken.source();
class Github extends Component {
    
    //初始化state
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            lastGistUrl: ''
        };
    }
    // 从服务端获取数据时可以将数据存储在 state 中，再用 this.setState 方法重新渲染 UI
    componentDidMount() {
        this.serverRequest = axios.get(this.props.source).then(function (result) {
            // console.log(result.data)
            // console.log(result.data[0].html_url)
            var lastGist = result.data[0];
            this.setState({
                username: lastGist.owner.login,
                lastGistUrl: lastGist.html_url
            });
        }.bind(this))
        //axios ajax test json-server
        // axios.put('http://localhost:3000/user/10000',
        //     {
        //         "id": 10001,
        //         "name": "张三",
        //         "age": 30,
        //         "gender": "female"
        //     }
        // )
        // axios({
        //     method: 'post',
        //     url: 'https://vrealize.example.com/suite-api/api/auth/token/acquire',
        //     contentType:"application/json",
        //     Accept: "application/json", 
        //     data: {
        //         "username": "vRealize-user",
        //         "password": "vRealize-dummy-password"
        //     }
        // });
    }
    //组件卸载前使用 componentWillUnmount 来取消未完成的请求
    // componentWillUnmount() {
    //     source.cancel('ddd');
    //         console.log(source);
    //         console.log(CancelToken);
    // }

    render() {
        return (
            <div>
                {this.state.username} 用户最新的 Gist 共享地址：
                <a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
            </div>
        );
    }
}
export default Github;
