// import { hashHistory } from 'react-router';
import axios from 'axios';

export default function request(method, url, data) {
    method = method.toUpperCase();
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中
        data = undefined;
    } else {
        data = data && JSON.stringify(data);
    }

    return axios(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
        },
        data
    }).then((res) => {
            if (res.status === 401) {
                this.props.history.push('/login');
                return Promise.reject('Unauthorized.');
            } else {
                const token = res.headers.get('access-token');
                if (token) {
                    sessionStorage.setItem('access_token', token);
                }
                return res.json();
            }
        });
}

export const get = url => request('GET', url);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) => request('PUT', url, data);
export const del = (url, data) => request('DELETE', url, data);