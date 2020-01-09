import axios from 'axios';

//局部拦截
const instance = axios.create();

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

//请求拦截
instance.interceptors.request.use(config => {
    //在发起请求的时候获取token
    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = token;
    }
    return config;
},error => {
    return Promise.reject(error);
});

//响应拦截
instance.interceptors.response.use(config => {
    //每次请求验证的时候都把最新的token存起来
    if(config.data.token){
        localStorage.setItem('token',config.data.token);
    }
    return config.data;
},error => {
    return Promise.reject(error);
});

export {instance}