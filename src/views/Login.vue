<template>
    <!-- 总容器 -->
    <div class="wrapper">
        <h1>体检预约-登录</h1>


        <section>
            <div class="reg-box">
                <p @click="toggleLoginMethod">
                    {{ loginMethod === 'code' ? '验证码登录' : '密码登录' }}
                </p>
            </div>
            <div class="input-box">
                <i class="fa fa-user-o"></i>
                <input type="text" v-model="users.userId" placeholder="输入手机号">
            </div>
            <div v-if="loginMethod === 'password'" class="input-box">
                <i class="fa fa-lock"></i>
                <input type="password" v-model="users.password" placeholder="输入登录密码">
            </div>
            <div v-else class="input-box">
                <i class="fa fa-smile-o" aria-hidden="true"></i>
                <input type="text" v-model="users.code" placeholder="输入验证码">
                <span class="time" v-if="isCountingDown">{{ countdown }} 秒后重新发送</span>
                <button class="send_code" v-else @click="send">发送验证码</button>
            </div>


            <div class="reg-box">
                <p @click="toRegister">注册</p>
                <p @click="dialogFormVisible = true">忘记密码？</p>

            </div>
            <div class="button-box">
                <el-button v-if="loginMethod === 'password'" class="button-box" :plain="true"
                    @click="login">登录</el-button>
                <el-button v-else class="button-box" :plain="true" @click="codeLogin">登录</el-button>
            </div>
        </section>
        <footer>
            <div>
                <div class="line"></div>
                <p>有疑问请联系客服</p>
                <div class="line"></div>
            </div>
            <p>4008-XXX-XXX</p>
        </footer>

        <el-dialog v-model="dialogFormVisible" title="忘记密码" width="300">
            <el-form :model="form">
                <el-form-item label="手机号码：" label-width="100px">
                    <el-input :disabled="step!==1" v-model="form.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item v-if="step === 2" label="验证码：" label-width="100px">
                    <el-input v-model="form.code" autocomplete="off" />
                    <span class="time" v-if="isCountingDown1">{{ countdown1 }} 秒后重新发送</span>
                    <!-- <button type="button" class="send_code" v-else @click="sendCode">发送验证码</button> -->
                </el-form-item>
                <span v-else-if="step === 3">
                    <el-form-item label="密码：" label-width="100px">
                        <el-input type="password" v-model="form.password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="确认密码：" label-width="100px">
                        <el-input type="password" v-model="form.repassword" autocomplete="off" />
                    </el-form-item>
                </span>
                <el-form-item>
                    <el-button type="primary" @click="canel">取 消</el-button>
                    <el-button v-if="step==1" type="primary" @click="sendCode">发送验证码</el-button>
                    <el-button v-else-if="step == 2" type="primary" @click="next">下一步</el-button>
                    <el-button v-else-if="step==3" type="primary" @click="update">确 定</el-button>
                   
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { setLocalStorage, setSessionStorage, getLocalStorage, getSessionStorage } from "../common.js";
import axios from "axios";
import { ElMessage } from 'element-plus';
const router = useRouter();
//切换登录方式
const loginMethod = ref('code');
//隐藏发送验证码按钮
const isSending = ref(true);
const users = reactive({
    userId: "",
    password: "",
    code: ""
});
//忘记密码提示框
const dialogFormVisible = ref(false);
//忘记密码表单
const form = reactive({
    phone: '',
    code: '',
    password: '',
    repassword: ''
});
//忘记密码步骤
const step = ref(1);

//取消忘记密码的操作
const canel = () => {
    dialogFormVisible.value = false;
    step.value = 1;
    form.phone = "";
    form.code = "";
    form.password = "";
    form.repassword = "";
}
//下一步，验证手机号和验证码
const next = () => {
    if (form.phone == "") {
        ElMessage.error("请输入手机号");
        return;
    }
    if (form.code == "") {
        ElMessage.error("请输入验证码");
        return;
    }

    axios({
        method: "post",
        url: "/api/users/updatePasswordOne",
        data: {
            userId: form.phone,
        },
        params: {
            code: form.code
        },
    })
        .then(res => {
            if (res.data.code == 1) {
                ElMessage({
                    message: "验证成功",
                    type: "success"
                })
                step.value = 3;
            } else {
                ElMessage.error(res.data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        })
}
//修改密码
const update = () => {
    if(form.phone==""){
        ElMessage.error("请输入手机号");
        return;
    }
    if(form.password==""){
        ElMessage.error("请输入密码");
        return;
    }
    if(form.repassword==""){
        ElMessage.error("请输入确认密码");
        return;
    }
    if(form.password!=form.repassword){
        ElMessage.error("两次密码输入不一致");
        return;
    }

    axios({
        method: "post",
        url: "/api/users/updatePasswordTwo",
        data: {
            userId: form.phone,
            password: form.password
        },
        headers: 'Content-Type:application/json'
    })
        .then(res => {
            if (res.data.code == 1) {
                ElMessage({
                    message: "修改成功",
                    type: "success"
                })
                dialogFormVisible.value = false;
                step.value = 1;
            } else {
                ElMessage.error(res.data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        })
}

//是否在倒计时
const isCountingDown = ref(false);
const isCountingDown1 = ref(false);
//倒计时
const countdown = ref('60');
const countdown1 = ref('60');

//忘记密码的发送验证码
const sendCode = () => {

    if(form.phone==""){
        console.log(form.phone)
        ElMessage.error("请输入手机号");
        return;
    }
    axios({
        method: "get",
        url: "/api/users/sendCode",
        params: {
            phone: form.phone
        },
    })
        .then(res => {
            if (res.data.code == 1) {
                ElMessage({
                    message: "发送成功",
                    type: "success"
                })
                startCountdown1();
                step.value=2;
            } else {
                ElMessage.error(res.data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        })
}

//首界面登录的发送验证码
const send = () => {
    if (users.userId == "") {
        ElMessage("请输入手机号");
        return;
    }
    axios({
        method: "get",
        url: "/api/users/sendCode",
        params: {
            phone: users.userId
        },
    })
        .then(res => {
            if (res.data.code == 1) {
                ElMessage({
                    message: "发送成功",
                    type: "success"
                })
                startCountdown();
            } else {
                ElMessage.error(res.data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        })
}

//发送验证码的倒计时
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
}

const startCountdown1 = () => {
    if (isCountingDown1.value) return; // 如果已经在倒计时中，则不做任何操作
    isCountingDown1.value = true;
    countdown1.value = '60'; // 重置倒计时秒数
    setInterval(() => {
        if (countdown1.value > 0) {
            countdown1.value -= 1;
        } else {
            isCountingDown1.value = false; // 倒计时结束
            clearInterval(interval); // 清除定时器
        }
    }, 1000);
}


const toggleLoginMethod = () => {
    console.log(loginMethod.value);
    loginMethod.value = loginMethod.value === 'password' ? 'code' : 'password';
}

//
const login = () => {
    if (users.userId == "") {
        ElMessage("请输入手机号");
        return;
    }
    if (users.password == "") {
        ElMessage("请输入密码");
        return;
    }
    axios({
        method: "post",
        url: "/api/users/login",
        data: {
            userId: users.userId,
            code: users.code
        },
        headers: 'Content-Type:application/json'

    })
        .then(res => {
            if (res.data.code == 1) {
                let users = res.data.data.user;
                //let users=res.data.data.users;
                setLocalStorage("token", res.data.data.token);
                setSessionStorage("users", users);
                console.log(users);
                ElMessage({
                    message: "登录成功",
                    type: "success"
                })
                router.push("/index");
            } else {
                console.log(res.data.message);
                ElMessage.error(res.data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        })
}

//验证码登录
const codeLogin = () => {
    if (users.userId == "") {
        ElMessage("请输入手机号");
        return;
    }
    if (users.code == "") {
        ElMessage("请输入验证码");
        return;
    }
    axios({
        method: "post",
        url: "/api/users/loginByCode",
        data: {
            userId: users.userId,
            code: users.code
        },
        headers: 'Content-Type:application/x-www-form-urlencoded'
    })
        .then(res => {
            if (res.data.code == 1) {
                let users = res.data.data.user;
                //let users=res.data.data.users;
                setLocalStorage("token", res.data.data.token);
                setSessionStorage("users", users);
                console.log(users);
                ElMessage({
                    message: "登录成功",
                    type: "success"
                })
                router.push("/index");
            } else {
                console.log(res.data.message);
                ElMessage.error(res.data.message);
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
.wrapper {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, #266C9F, #266C9F, #7EB059);
    overflow: hidden;
}

/*********************** 标题部分 ***********************/
h1 {
    text-align: center;
    color: #FFF;
    font-size: 9.5vw;
    font-weight: 500;
    margin-top: 13vh;
    margin-bottom: 3vh;
}

/*********************** 内容部分 ***********************/
section {
    width: 86vw;
    margin: 0 auto;
    background-color: #FFF;
    border-radius: 2.4vw;

    box-sizing: border-box;
    padding: 6vw;
}

section .input-box {
    width: 100%;
    height: 12vw;
    border: solid 1px #CCC;
    border-radius: 2vw;
    margin-top: 5vw;

    display: flex;
    align-items: center;
}

section .input-box i {
    margin: 0 3.6vw;
    font-size: 5.4vw;
    color: #CCC;
}

section .input-box input {
    border: none;
    outline: none;
    flex-grow: 1;
    width: 90px;
}

section .reg-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 5vw;
    margin-bottom: 2vw;
}

section .reg-box p {
    font-size: 3.3vw;
    color: #2D727E;
    user-select: none;
    cursor: pointer;
}

section .button-box {
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

.send_code {
    margin-right: 1vw;
    font-size: 3.3vw;
    cursor: pointer;
    color: #409EFF;
    padding: 0 0.1vw;
}

.time {
    margin-right: 1vw;
    font-size: 3.3vw;
    cursor: pointer;
    color: #409EFF;
    padding: 0 0.1vw;
}

/*********************** footer部分 ***********************/
footer {
    width: 86vw;
    margin: 0 auto;
    margin-top: 72vw;
    font-size: 3.8vw;
    color: #FFF;
}

footer div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

footer div .line {
    width: 22vw;
    height: 1px;
    background-color: #FFF;
}

footer>p {
    text-align: center;
    margin-top: 2vw;
}
</style>