<template>
     <!-- 总容器 -->
     <div class="wrapper">
        <h1>体检预约-登录</h1>
        <section>
            <div class="input-box">
                <i class="fa fa-user-o"></i>
                <input type="text" v-model="users.userId" placeholder="输入手机号">
            </div>
            <div class="input-box">
                <i class="fa fa-lock"></i>
                <input type="password" v-model="users.password" placeholder="输入登录密码">
            </div>
            <div class="reg-box">
                <p @click="toRegister">注册</p>
                <p>忘记密码？</p>
            </div>
            <div class="button-box" @click="login">登录</div>
        </section>

        <footer>
            <div>
                <div class="line"></div>
                <p>有疑问请联系客服</p>
                <div class="line"></div>
            </div>
            <p>4008-XXX-XXX</p>
        </footer>
    </div>   
</template>

<script setup>
import { reactive, toRefs,ref } from "vue";
import { useRouter } from "vue-router";
import { setSessionStorage } from "../common.js";
import axios from "axios";

const router = useRouter();

const users = reactive({
    userId:"",
    password:""
});

const login = () => {
    if(users.userId == ""){
        alert("请输入手机号");
        return;
    }
    if(users.password == ""){
        alert("请输入密码");
        return;
    }
    axios({
        method: "post",
        url: "/api/users/login",
        data: {
            userId: users.userId,
            password: users.password
        }
    })
    .then(res => {
        let users = res.data.data; 
        if (res.data.code==1) {
            setSessionStorage("users", users);
            alert("登录成功");
            router.push("/index");
        } else {
            alert(res.data.message);
        }
    })
    .catch((error) => {
          console.error(error);
        })
}

const toRegister = () => {
    router.push("/register");
}

</script>

<style scoped>
/*********************** 总容器 ***********************/
.wrapper{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg,#266C9F,#266C9F,#7EB059);
    overflow: hidden;
}

/*********************** 标题部分 ***********************/
h1{
    text-align: center;
    color: #FFF;
    font-size: 9.5vw;
    font-weight: 500;
    margin-top: 13vh;
    margin-bottom: 3vh;
}

/*********************** 内容部分 ***********************/
section{
    width: 86vw;
    margin: 0 auto;
    background-color: #FFF;
    border-radius: 2.4vw;

    box-sizing: border-box;
    padding: 6vw;
}

section .input-box{
    width: 100%;
    height: 12vw;
    border: solid 1px #CCC;
    border-radius: 2vw;
    margin-top: 5vw;

    display: flex;
    align-items: center;
}
section .input-box i{
    margin: 0 3.6vw;
    font-size: 5.4vw;
    color: #CCC;
}
section .input-box input{
    border: none;
    outline: none;
}

section .reg-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 5vw;
    margin-bottom: 2vw;
}
section .reg-box p{
    font-size: 3.3vw;
    color: #2D727E;
    user-select: none;
    cursor: pointer;
}

section .button-box{
    width: 100%;
    height: 13vw;
    border-radius: 2vw;
    background-color: #70B0BC;

    text-align: center;
    line-height: 13vw;
    font-size: 4.6vw;
    color: #FFF;
    letter-spacing: 1vw;

    user-select: none;
    cursor: pointer;
}

/*********************** footer部分 ***********************/
footer{
    width: 86vw;
    margin: 0 auto;
    margin-top: 72vw;
    font-size: 3.8vw;
    color: #FFF;
}
footer div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
footer div .line{
    width: 22vw;
    height: 1px;
    background-color: #FFF;
}
footer > p{
    text-align: center;
    margin-top: 2vw;
}
</style>