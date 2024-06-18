<template>
    <!-- 总容器 -->
    <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>选择体检日期</p>
            <div></div>
        </header>
        <div class="top-ban"></div>

        <section>
            <div class="date-box">
                <i class="fa fa-caret-left" @click="prevMonth"></i>
                <p>{{ currentYear }}年{{ currentMonth }}月</p>
                <i class="fa fa-caret-right" @click="nextMonth"></i>
            </div>
            <table>
                <tr>
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                </tr>
            </table>
            <ul>
                <li v-for="(calendar, index) in state.calendarArr" :key="calendar.ymd">
                    <p :class="{
                        fontcolor: calendar.remainder != null && calendar.remainder != 0,
                        pselect: calendar.selectDay == 1
                    }" @click="selectDay(index)">
                        {{ calendar.day }}
                    </p>
                    <p></p>
                    <p v-if="calendar.remainder != null && calendar.total!=0">
                    <div v-if="calendar.remainder != 0">
                        余{{ calendar.remainder }}
                    </div>
                   <div v-else>
                        已约满
                   </div>
                    </p>
                

                </li>
            </ul>
        </section>

        <div class="bottom-btn">
            <div></div>
            <div @click="getTodayDate">下一步</div>
        </div>

        <div class="bottom-ban"></div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import { ref, reactive, toRefs } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { getSessionStorage, setSessionStorage ,getCurDate } from "../common.js";
const router = useRouter();
//获取当前日期，年份，月份，日期
const now = new Date();
const currentYear = ref(now.getFullYear());
const currentMonth = ref(now.getMonth() + 1);
const currentDay = ref(now.getDate());

const hospital = getSessionStorage('hospital');
const setmeal = getSessionStorage('setMeal');

const state = reactive({
    hpId: hospital.hpId,
    smId: setmeal.smId,
    calendarArr: [],
     selectedDate: getCurDate(),//选中的日期  
})



const prevMonth = () => {
    if (currentMonth.value === 1) {
        currentMonth.value = 12;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }
    generateCalendar();
};

const nextMonth = () => {
    if (currentMonth.value === 12) {
        currentMonth.value = 1;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }
    generateCalendar();
};

const selectDay = (index) => {
    if (state.calendarArr[index].remainder != null && state.calendarArr[index].remainder != 0) {
        state.selectedDate = state.calendarArr[index].ymd;
        for (let i = 0; i < state.calendarArr.length; i++) {
            state.calendarArr[i].selectDay = 0;
        }
        state.calendarArr[index].selectDay = 1;
    }
    console.log(state.selectedDate)
};

const getTodayDate = () => {
    if (state.selectedDate == null) {
        alert("请选择体检日期");
        return;
    }
    setSessionStorage("selectedDate", state.selectedDate);
    router.push('/confirmOrder');
};

const generateCalendar = () => {
    axios({
        method: 'post',
        url: 'api/calendar/getCalendar',
        data: {
            hpId: hospital.hpId,
            year: currentYear.value,
            month: currentMonth.value
        },
    }).then((res) => {
        if (res.data.code == 0) {
            alert(res.data.message);
            return;
        }
        state.calendarArr = res.data.data;

        for (let i = 0; i < state.calendarArr.length; i++) {
            if (state.calendarArr[i].ymd != null) {
                state.calendarArr[i].day = parseInt(
                    state.calendarArr[i].ymd.substring(8));

                if (state.calendarArr[i].ymd == state.selectedDate) {
                    state.calendarArr[i].selectDay = 1;
                }
                else {
                    state.calendarArr[i].selectDay = 0;
                }
            }
        }
    }).catch((err) => {
        console.log(err);
    });


}
generateCalendar();
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

/*********************** footer ***********************/
footer {
    width: 100%;
    height: 14.2vw;
    box-sizing: border-box;
    border-top: solid 1px #E9E9E9;
    background-color: #FFF;

    position: fixed;
    left: 0;
    bottom: 0;
}

footer ul {
    width: 100%;
    height: 14.2vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

footer ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 3vw;
    color: #999;

    user-select: none;
    cursor: pointer;
}

footer ul li .fa {
    font-size: 5vw;
}

/*********************** common样式 ***********************/
.top-ban {
    width: 100%;
    height: 15.7vw;
}

.bottom-ban {
    width: 100%;
    height: 14.2vw;
}

/*********************** section ***********************/
section {
    width: 82vw;
    margin: 0 auto;
    margin-top: 12vw;
}

section .date-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 4.5vw;
    font-weight: 600;
}

section .date-box p {
    color: #000;
}

section .date-box i {
    color: #999;
    user-select: none;
    cursor: pointer;
}

section table {
    width: 100%;
    font-size: 3.8vw;
}

section table tr th {
    text-align: center;
    font-weight: 600;
    line-height: 12vw;
}

section ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

section ul li {
    width: 14.28%;
    height: 12vw;
    font-weight: 600;
    color: #999;
}

section ul li p:first-child {
    width: 6vw;
    height: 6vw;
    margin: 0 auto;
    border-radius: 3vw;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 4.2vw;

    user-select: none;
    cursor: pointer;
}

section ul li p:last-child {
    font-size: 3vw;
    font-weight: 300;
    text-align: center;
    user-select: none;
}

.fontcolor {
    color: #333;
}

.pselect {
    background-color: #FB902B;
    color: #FFF;
}

/*********************** bottom-btn ***********************/
.bottom-btn {
    width: 100%;
    height: 12vw;
    background-color: #FFF;

    position: fixed;
    left: 0;
    bottom: 14.2vw;

    display: flex;
}

.bottom-btn div:first-child {
    flex: 2;
}

.bottom-btn div:last-child {
    flex: 1;
    background-color: #117C94;
    text-align: center;
    line-height: 12vw;
    font-size: 5vw;
    color: #FFF;

    user-select: none;
    cursor: pointer;
}
</style>