<template>
     <!-- 总容器 -->
     <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>我的预约</p>
            <div></div>
        </header>
        <div class="top-ban"></div>

        <ul>
            <li v-for="(order, index) in appointmentList" :key="index">
                <div class="left">
                    <p>{{order.orderDate}} {{order.hospital.name}}</p>
                    <p>{{order.setMeal.name}}</p>
                </div>
                <div class="right" @click="toAppiontmentcancel(index)">
                    取消预约
                </div>
                <!-- <div class="left">
                    <p>2022-03-22</p>
                    <p>普通男士客户-基础套餐</p>
                </div>
                <div class="right" @click="toAppointmentcancel">
                    取消预约
                </div> -->

            </li>
        </ul>
        
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

const appointmentList=ref([
]);

const router = useRouter();

const toAppiontmentcancel = (index) => {
    axios({
        method: "get" ,
        url:"/api/orders/cancelOrder/"+appointmentList.value[index].orderId,
        
    })
    .then(res => {
    })
    router.push("/appointmentcancel")
};


const init=()=>{
    axios({
        method:"post",
        url:"/api/orders/checkOrder",
        data:{
            userId:getSessionStorage('users').userId
        }
    })
    .then(res => {
        if(res.data.code == 1){
            appointmentList.value=res.data.data;
            setSessionStorage("appointmentList",appointmentList);
        }
        else{
            alert(res.data.message);
        }
    })
    .catch(err => {
        alert(err);
    });
}
init();

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
    height: 14.2vw;
}

/*********************** ul ***********************/
ul{
    width: 86vw;
    margin: 0 auto;
}
ul li{
    width: 100%;
    height: 14vw;
    border-bottom: solid 1px #EEE;

    display: flex;
    justify-content: space-between;
    align-items: center;
}
ul li .left{
    user-select: none;
    cursor: pointer;
}
ul li .left p:first-child{
    color: #555;
    font-size: 3.3vw;
}
ul li .left p:last-child{
    color: #333;
    font-size: 4.2vw;
    font-weight: 600;
}
ul li .right{
    font-size: 4vw;
    color: #E6A23C;
}
</style>