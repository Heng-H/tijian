<template>
    <!-- footer -->
    <footer>
            <ul>
                <li @click="toIndex">
                    <i class="fa fa-home"></i>
            
                    <p>云医院</p>
                </li>
                <li>
                    <i class="fa fa-opencart"></i>
                    <Shop/>
                    <p>商城</p>
                </li>
                <li>
                    <i class="fa fa-compass"></i>
                    <Discovery/>
                    <p>发现</p>
                </li>
                <li @click="toMe">
                    <i class="fa fa-user"></i>
                    <Me/>
                    <p>我</p>
                </li>
            </ul>
        </footer>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { reactive, toRefs,ref } from "vue";
import { useRouter } from "vue-router";
import { setSessionStorage } from "../common.js";
import axios from "axios";

const router = useRouter();

const toMe = () => {
        router.push("/personal");
};

const toIndex = () => {
        router.push("/index");
};


</script>

<style scoped>
@import url('https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css');
/*********************** footer ***********************/
footer{
    width: 100%;
    height: 14.2vw;
    box-sizing: border-box;
    border-top: solid 1px #E9E9E9;
    background-color: #FFF;

    position: fixed;
    left: 0;
    bottom: 0;
}
footer ul{
    width: 100%;
    height: 14.2vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
footer ul li{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 3vw;
    color: #999;

    user-select: none;
    cursor: pointer;
}
footer ul li .fa{
    font-size: 5vw;
}
</style>