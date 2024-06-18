<template>
    <!-- 总容器 -->
    <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>体检报告</p>
            <div></div>
        </header>

        <nav>
            <div :class="{ active: currentView === 'summary' }"  @click="switchView('summary')">总检结论</div>
            <div :class="{ active: currentView === 'report' }" @click="switchView('report')">报告详情</div>
        </nav>

        <div class="top-ban"></div>

        <div class="nav-content-item" v-if="currentView === 'summary'">
            <div class="item">
                <div class="title">异常项</div>
                <ul>
                    <li>
                        <div class="indications">
                            <div class="left">
                                <div>异</div>
                                <p>收缩压</p>
                            </div>
                            <div class="right">
                                <p>149</p>
                                <p>正常值范围：&lt;140</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="indications">
                            <div class="left">
                                <div>异</div>
                                <p>白细胞计数</p>
                            </div>
                            <div class="right">
                                <p>3.56 10^9/L</p>
                                <p>正常值范围：4-10</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

        <div class="nav-content-item" v-else-if="currentView === 'report'">
            <div class="item">
                <div class="title">一般检测</div>
                <ul>
                    <li>
                        <div class="indications">
                            <div class="left">
                                <div>异</div>
                                <p>收缩压</p>
                            </div>
                            <div class="right">
                                <p>149</p>
                                <p>正常值范围：&lt;140</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="indications">
                            <div class="left">
                                <p>舒张压</p>
                            </div>
                            <div class="right">
                                <p>90</p>
                                <p>正常值范围：&lt;90</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="indications">
                            <div class="left">
                                <p>身高</p>
                            </div>
                            <div class="right">
                                <p>177.00 cm</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="indications">
                            <div class="left">
                                <p>体重</p>
                            </div>
                            <div class="right">
                                <p>80 kg</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="bottom-ban"></div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { setSessionStorage } from "../common.js";
import axios from "axios";


const router = useRouter();

const currentView = ref('summary');

const switchView = (view) => {
    currentView.value = view;
}

// window.onload = function () {
//     //获取导航栏元素数组
//     let navItemArr = document.getElementsByTagName('nav')[0].getElementsByTagName('div');
//     //获取需要跟随导航切换的tab页面  
//     let navContentItemArr = document.getElementsByClassName('nav-content-item');

//     function work(index) {
//         //重置初始状态
//         for (let i = 0; i < navItemArr.length; i++) {
//             navItemArr[i].style.borderBottom = 'none';
//             navItemArr[i].style.color = '#555';
//         }
//         for (let i = 0; i < navContentItemArr.length; i++) {
//             navContentItemArr[i].style.display = 'none';
//         }
//         navItemArr[index].style.borderBottom = 'solid 2px #137E92';
//         navItemArr[index].style.color = '#137E92';
//         navContentItemArr[index].style.display = 'block';
//     }
//     work(0);

//     for (let i = 0; i < navItemArr.length; i++) {
//         navItemArr[i].onclick = function () {
//             work(i);
//         }
//     }
// }
</script>

<style scoped>
/*********************** 总容器 ***********************/
.wrapper {
    width: 100%;
    height: 100%;
    background-color: #F9F9F9;
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

/*********************** common样式 ***********************/
.top-ban {
    width: 100%;
    height: 31.7vw;
}

.bottom-ban {
    width: 100%;
    height: 14.2vw;
}

/*********************** nav ***********************/
nav {
    width: 100%;
    height: 16vw;
    display: flex;
    background-color: #F9F9F9;

    position: fixed;
    left: 0;
    top: 15.7vw;
}

nav div {
    flex: 1;
    height: 14vw;
    box-sizing: border-box;

    text-align: center;
    line-height: 14vw;
    font-size: 4.2vw;
    font-weight: 600;
    color: #555;
}

.active {
    border-bottom: solid 2px #137E92;
    color: #137E92;
}

/*********************** nav-content-item ***********************/
.nav-content-item .item {
    width: 92vw;
    margin: 0 auto;
    margin-top: 3vw;
    margin-bottom: 3vw;
    overflow: hidden;
    border-radius: 3vw;
    background-color: #FFF;
}

.nav-content-item .item .title {
    width: 100%;
    height: 10vw;
    background-color: #7BAFD7;
    line-height: 10vw;
    box-sizing: border-box;
    padding-left: 4vw;
    font-size: 4.2vw;
    color: #FFF;
}

.nav-content-item .item ul {
    width: 100%;
}

/****** 数值型检查项样式 ******/
.nav-content-item .item ul li {
    border-bottom: solid 1px #EEE;
}

.nav-content-item .item ul li:last-child {
    border-bottom: none;
}

.nav-content-item .item ul li .indications {
    width: 100%;
    height: 14vw;
    padding: 0 3vw;
    display: flex;
    align-items: center;
    font-size: 3.2vw;
    color: #333;
}

.nav-content-item .item ul li .indications .left {
    flex: 1;
    display: flex;
}

.nav-content-item .item ul li .indications .left div {
    background-color: #BA634E;
    color: #FFF;
    padding: 0.2vw 0.6vw;
    border-radius: 0.6vw;
}

.nav-content-item .item ul li .indications .left p {
    font-weight: 600;
    margin-left: 2vw;
}

.nav-content-item .item ul li .indications .right {
    flex: 1;
}

.nav-content-item .item ul li .indications .right p:last-child {
    color: #999;
}

/****** 数值型检查项样式 ******/

/****** 描述型检查项样式 ******/
.nav-content-item .item ul li .indications-type-4 {
    width: 100%;
    box-sizing: border-box;
    padding: 0 3vw;

    font-size: 3.2vw;
    color: #333;
}

.nav-content-item .item ul li .indications-type-4 div {
    margin: 5vw 0;
}

.nav-content-item .item ul li .indications-type-4 div:first-child {
    font-weight: 600;
}

.nav-content-item .item ul li .indications-type-4 div:last-child {
    color: #999;
}

/****** 描述型检查项样式 ******/

.nav-content-item .item ul .conclusion-title {
    width: 100%;
    height: 12vw;
    box-sizing: border-box;
    border-bottom: solid 1px #EEE;
    padding: 0 3vw;

    display: flex;
    align-items: center;
    font-size: 4vw;
    color: #555;
}

.nav-content-item .item ul .conclusion-title:last-child {
    border-bottom: none;
}

.nav-content-item .item ul .conclusion-content {
    width: 100%;
    box-sizing: border-box;
    border-bottom: solid 1px #EEE;
    padding: 4vw 3vw;
    font-size: 3.6vw;
    color: #555;
}

.nav-content-item .item ul .conclusion-content:last-child {
    border-bottom: none;
}

.nav-content-item .item ul .conclusion-content h3 {
    font-size: 4vw;
    font-weight: 600;
    margin-bottom: 2vw;
}

.nav-content-item .item ul .conclusion-content p {
    text-indent: 8vw;
}
</style>