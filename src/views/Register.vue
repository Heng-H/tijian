<template>

    <!-- 总容器 -->
    <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>注册</p>
            <div></div>
        </header>
        <div class="top-ban"></div>
        <h1>欢迎注册</h1>
        <table>
            <tr>
                <td>手机号码</td>
                <td><input type="text" v-model="users.userId" placeholder="请输入手机号码"></td>
            </tr>
            <tr>
                <td>真实姓名</td>
                <td><input type="text" v-model="users.realName" placeholder="真实姓名便于查看体检报告"></td>
            </tr>
            <tr>
                <td>生日</td>
                <td><input type="date" v-model="users.birthday"></td>
            </tr>
            <tr>
                <td>性别</td>
                <td>
                    <input type="radio" v-model="users.sex" name="gender" value="1" checked>男
                    <input type="radio" v-model="users.sex" name="gender" value="0">女
                </td>
            </tr>
            <tr>
                <td>身份证号</td>
                <td><input type="text" v-model="users.identityCard" placeholder="请输入身份证号"></td>
            </tr>
            <tr>
                <td>密码</td>
                <td><input type="password" v-model="users.password" placeholder="请输入密码"></td>
            </tr>
            
            <tr>
                <td>确认密码</td>
                <td><input type="password" v-model="users.repassword" placeholder="请再次输入密码"></td>
            </tr>

            <tr>
                <td>验证码</td>
                <td><input type="text" v-model="users.code" placeholder="输入验证码">
                <span class="time" v-if="isCountingDown">{{ countdown }} 秒后重新发送</span>
                <button class="send_code" v-else @click="startCountdown">发送验证码</button></td>
            </tr>
            
        </table>
        <div class="btn" @click="register">完成</div>
    </div>
</template>

<script setup>
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { setSessionStorage } from "../common.js";
import axios from "axios";

const router = useRouter();

const users = reactive({
    userId: "",
    realName: "",
    birthday: "",
    sex: "1",
    identityCard: "",
    password: "",
    repassword: "",
    code: ""
});

const isCountingDown = ref(false);
const countdown = ref('60');
const send=()=>{
    axios({
        method: "get",
        url: "/api/users/sendCode",
        params: {
            phone: users.userId,
            type:1
        },
    })
        .then(res => {
            if (res.data.code == 1) {
                ElMessage({
                    message: "发送成功",
                    type: "success"
                })
            } else {
                ElMessage.error(res.data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        })
}
const startCountdown = () => {
    if (isCountingDown.value) return; // 如果已经在倒计时中，则不做任何操作
    isCountingDown.value = true;
    countdown.value = '60'; // 重置倒计时秒数
    setInterval(() => {
        if (countdown.value > 0) {
            countdown.value -= 1;
        } else {
            isCountingDown.value = false; // 倒计时结束
            clearInterval(interval); // 清除定时器

        }
    }, 1000);
    send();
}

const register = () => {
   if(users.userId === "" || users.realName === "" || users.birthday === "" || users.identityCard === "" || users.password === "" || users.repassword === "") {
        alert("请填写完整信息");
        return;
   }
    if (users.password !== users.repassword) {
        alert("两次密码输入不一致");
        return;
    }
    if(users.code === "") {
        alert("请输入验证码");
        return;
    }
    axios({
        method: "post",
        url: "/api/users/register",
        data: users,
        params: { code: users.code } 
    })
        .then(res => {
            let users = res.data.data;
            if (res.data.code === 1) {
                alert("注册成功");
                router.push("/");
            } else {
                alert(res.data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        });
}
</script>

<style scoped>
/*********************** 总容器 ***********************/
.wrapper {
    width: 100%;
    height: 100%;
}

.send_code{
    margin-right: 1vw;
    font-size: 3.3vw;
    cursor: pointer;
    color: #409EFF;
    padding: 0 0.1vw;
}

.time{
    margin-right: 1vw;
    font-size: 3.3vw;
    cursor: pointer;
    color: #409EFF;
    padding: 0 0.1vw;
}

/*********************** header ***********************/
header {
    width: 100%;
    height: 15.7vw;
    background-color: #FFF;

    position: fixed;
    left: 0;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    padding: 0 3.6vw;
}

header .fa {
    font-size: 8vw;
}

/*********************** 标题部分 ***********************/
h1 {
    font-size: 7.4vw;
    font-weight: 500;
    box-sizing: border-box;
    padding: 0 3.6vw;
    margin-top: 6vw;
}

/*********************** common样式 ***********************/
.top-ban {
    width: 100%;
    height: 15.7vw;
}

/*********************** table ***********************/
table {
    width: 92.8vw;
    margin: 0 auto;
    margin-top: 5vw;
    border-collapse: collapse;

    font-size: 4.2vw;
}

table tr td {
    height: 12vw;
    border-bottom: solid 1px #DDD;
    width: 50px;
}

table tr td input {
    border: none;
    outline: none;
    flex-grow: 1;
    width: 160px;
}

/*********************** btn ***********************/
.btn {
    width: 92.8vw;
    margin: 0 auto;
    height: 12vw;
    margin-top: 8vw;
    background-color: #137E92;
    border-radius: 2vw;
    color: #FFF;
    font-size: 5vw;
    text-align: center;
    line-height: 12vw;

    user-select: none;
    cursor: pointer;
}
</style>