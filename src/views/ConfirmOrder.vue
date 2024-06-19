<template>
        <!-- 总容器 -->
        <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>确认您的订单</p>
            <div></div>
        </header>
        <div class="top-ban"></div>

        <section>
            <div class="title">
                <p>体检人信息</p>
            </div>
            <table>
                <tr>
                    <td>姓名:</td>
                    <td>{{users.realName}}</td>
                </tr>
                <tr>
                    <td>证件号码:</td>
                    <td>{{users.identityCard}}</td>
                </tr>
                <tr>
                    <td>出生日期:</td>
                    <td>{{ users.birthday.split('T')[0] }}</td>
                </tr>
                <tr>
                    <td>手机号码:</td>
                    <td>{{ users.userId }}</td>
                </tr>
            </table>
            <div class="title">
                <p>体检日期</p>
            </div>
            <table>
                <tr>
                    <td>{{ selectedDate }}</td>
                </tr>
            </table>
            <div class="title">
                <p>体检机构</p>
            </div>
            <table>
                <tr>
                    <td colspan="2">{{hospital.name}}</td>
                </tr>
                <tr>
                    <td>营业时间:</td>
                    <td>{{hospital.businessHours}}</td>
                </tr>
                <tr>
                    <td>采血截止:</td>
                    <td>{{hospital.deadline}}</td>
                </tr>
                <tr>
                    <td>机构电话:</td>
                    <td>{{ hospital.telephone }}</td>
                </tr>
                <tr>
                    <td>机构地址:</td>
                    <td>{{ hospital.address }}</td>
                </tr>
            </table>
            <div class="title">
                <p>套餐类型</p>
            </div>
            <table>
                <tr>
                    <td>{{ setMeal.name }}</td>
                </tr>
            </table>
        </section>
        
        <div class="bottom-btn">
            <div class="first">实付款: <span>￥{{ setMeal.price }}</span></div>
            <div class="last" @click="appointmentsuccess">确认支付</div>
        </div>

        <div class="bottom-ban"></div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { reactive, toRefs,ref } from "vue";
import { useRouter } from "vue-router";
import { setSessionStorage,getSessionStorage} from "../common.js";
import axios from "axios";
import { ElMessage } from 'element-plus'
const router = useRouter();

const users = getSessionStorage("users");

const hospital = getSessionStorage("hospital");

const setMeal = getSessionStorage("setMeal");

const selectedDate = getSessionStorage("selectedDate");

const order = reactive({
    orderDate: selectedDate,
    hpId: hospital.hpId,
    smId: setMeal.smId,
    userId: users.userId,
});

const appointmentsuccess = () => {
    console.log(order.orderDate);
    axios({
        method:"post",
        url: "/api/orders/createOrder",
        data: order
    })
    .then((res) => {
        if(res.data.code == 1){
            router.push('/appointmentsuccess');
        }
        else{
            ElMessage.error(res.data.message);
        }
    })
    .catch((err) => {
        alert(err);
    });
}

</script>

<style scoped>
/*********************** 总容器 ***********************/
.wrapper{
    width: 100%;
    height: 100%;
    background-color: #F9F9F9;
}

/*********************** header ***********************/
header{
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
header .fa{
    font-size: 8vw;
}

/*********************** common样式 ***********************/
.top-ban{
    width: 100%;
    height: 15.7vw;
}
.bottom-ban{
    width: 100%;
    height: 26.2vw;
}

/*********************** section ***********************/
section{
    width: 86vw;
    margin: 0 auto;
}
section .title{
    width: 100%;
    height: 12vw;
    border-bottom: solid 1px #EEE;

    display: flex;
    align-items: center;
}
section .title p{
    height: 3.4vw;
    line-height: 3.4vw;
    font-size: 4.2vw;
    font-weight: 600;
    box-sizing: border-box;
    padding-left: 3vw;
    border-left: solid 2px #127A90;
}
section table{
    font-size: 3.6vw;
    color: #555;
    margin-top: 2vw;
}
section table tr{
    line-height: 8vw;
}
section table tr td:first-child{
    width: 22%;
}

/*********************** bottom-btn ***********************/
.bottom-btn{
    width: 100%;
    height: 12vw;
    background-color: #FFF;

    position: fixed;
    left: 0;
    bottom: 14.2vw;

    display: flex;
}
.bottom-btn .first{
    flex: 2;
    line-height: 12vw;
    font-size: 4.6vw;
    box-sizing: border-box;
    padding-left: 6vw;
}
.bottom-btn .first span{
    color: #F77B2D;
}
.bottom-btn .last{
    flex: 1;
    background-color: #117C94;
    line-height: 12vw;
    text-align: center;
    font-size: 5vw;
    color: #FFF;

    user-select: none;
    cursor: pointer;
}
</style>