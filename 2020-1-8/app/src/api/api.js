import {instance} from './index';

export const post = (username) =>instance.post('http://localhost/login',username);

export const islogin = () => instance.post('http://localhost/islogin').then(d=>{
    if(d.code === 0){
        return true;
    }
    return false;
})