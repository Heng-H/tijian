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
                    <p @click="toAppiontment(index)">{{order.setMeal.name}}</p>
                </div>
                <div class="right">
                     <button v-if="order.state==1" @click="toAppiontmentcancel(index)">取消预约</button>
                     <p v-else-if="order.state==0" style="color:red">已取消</p>
                     <p v-else style="color: green;">已归档</p>
                </div>

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
import { ElMessage, ElMessageBox } from 'element-plus'
const appointmentList=ref([
]);

const router = useRouter();

const toAppiontmentcancel = (index) => {
    ElMessageBox.confirm(
        '你确认要取消预约吗?',
        {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
    ).then(() =>{
        
    axios({
        method: "get" ,
        url:"/api/orders/cancelOrder/"+appointmentList.value[index].orderId,    
    })
    .then(res => {
        if(res.data.code == 1){
            ElMessage({
                type:'success',
                message:'Delete'
            });
            router.push("/appointmentcancel")
        }
        else{
            alert(res.data.message);
        }
    })
    
}).catch(()=>{
    ElMessage({
        type:'info',
        message:'delete canceled'
    })
})

};

const toAppiontment = (index) => {
    setSessionStorage("order",appointmentList.value[index])
    router.push("/order")
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