<template>
    <!-- 总容器 -->
    <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>健康档案</p>
            <div></div>
        </header>
        <div class="top-ban"></div>

        <section>
            <img src="../assets/img/report.png">
            <ul>
                <li v-for="(item,index) in reportList" :key="index">
                    <div class="left">
                        <i class="fa fa-file-text-o"></i>
                        <div>
                            <p>{{ item.reportDate }} 体检报告</p>
                            <p>{{ item.hpName }}</p>
                        </div>
                    </div>
                    <div v-if="item.state==2" class="right" @click="toReport(index)">
                        <!-- <i class="fa fa-angle-right"></i> -->
                    </div>
                </li>
            </ul>
        </section>
        
        <div class="bottom-ban"></div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { reactive, toRefs,ref } from "vue";
import { useRouter } from "vue-router";
import { getSessionStorage, setSessionStorage } from "../common.js";
import axios from "axios";

const router = useRouter();

const reportList = ref([

]);

const toReport = (index) => {
    setSessionStorage("report", reportList.value[index]);
    router.push("/report");
};

const init = () => {
    axios({
        method: "get",
        url: "api/cireport/checkCireport/"+getSessionStorage("users").userId,
        
    }).then((res) => {
        if(res.data.code == 1){
            reportList.value = res.data.data;
            console.log(res.data.data);
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

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

/*********************** section ***********************/
section{
    width: 100%;
}
section img{
    width: 100%;
    display: block;
}
section ul{
    width: 86vw;
    margin: 0 auto;
}
section ul li{
    width: 100%;
    height: 18vw;
    border-bottom: solid 1px #EEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
section ul li .left{
    display: flex;
    align-items: center;
}
section ul li .left i{
    font-size: 8vw;
    color: #6BB9B6;
    margin-right: 3vw;
}
section ul li .left p:first-child{
    color: #555;
    font-size: 4.2vw;
    font-weight: 600;
}
section ul li .left p:last-child{
    color: #999;
    font-size: 3.2vw;
    font-weight: 600;
    margin-top: 1vw;
}
section ul li .right{
    user-select: none;
    cursor: pointer;
}
section ul li .right i{
    color: #999;
    font-size: 6vw;
}
</style>