<template>
    <div>
        <p>请登录</p>
        用户名: <input type="text" v-model="username">
        密码: <input type="password" v-model="pass">
        <button @click="login">登录</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username:'',
                pass:''
            }
        },
        methods:{
            login(){
                const {username,pass} = this;
                setTimeout(()=>{
                    if(username === '小花' && pass === '123'){
                        // this.$router.push('/');
                        // this.$router.push({
                        //     path:'/',
                        //     query:{
                        //         name:'小花'
                        //     }
                        // });
                        
                        //替换
                        this.$router.replace({
                            path:'/',
                            query:{
                                name:'小花'
                            }
                        });

                    }
                },2000);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>