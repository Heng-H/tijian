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
            <p>{{ currentYear }}年{{ currentMonth + 1 }}月</p>
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
            <li v-for="(day, index) in calendarDays" :key="index">
                <p :class="{ 'fontcolor': day.isCurrentMonth, 'pselect': day.isToday }">{{ day.date }}</p>
                <p v-if="day.isCurrentMonth">余{{ day.slots }}</p>
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
import {ref, reactive} from 'vue';
import { onMounted } from 'vue';

        const now = new Date();
        const currentYear = ref(now.getFullYear());
        const currentMonth = ref(now.getMonth());
        const currentDay = ref(26);

        const actualMonth = ref(now.getMonth()) ;
        const actualYear = ref(now.getFullYear());
        const actualInMonth = ref(new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
        const calendarDays = ref([]);

        const generateCalendar = () => {
            const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1).getDay();
            const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
            const daysInLastMonth = new Date(currentYear.value, currentMonth.value, 0).getDate();
            
            const days = [];

            // Fill in days from the previous month
            for (let i = firstDayOfMonth; i > 0; i--) {
                days.push({
                    date: daysInLastMonth - i + 1,
                    isCurrentMonth: false,
                    isToday: false,
                    slots: 0
                });
            }

            // Fill in days of the current month
            for (let i = 1; i <= daysInMonth; i++) {
                days.push({
                    date: i,
                    isCurrentMonth: true,
                    isToday: isToday(i),
                    slots: slot(i) // Random slots for demo purposes
                });
            }

            // Fill in days from the next month to complete the last week
            const remainingDays = 42 - days.length;
            for (let i = 1; i <= remainingDays; i++) {
                days.push({
                    date: i,
                    isCurrentMonth: false,
                    isToday: false,
                    slots: 0
                });
            }

            calendarDays.value = days;
        };
        const slot = (i) => {
        let a = currentYear.value-actualYear.value;
        let b = currentMonth.value-actualMonth.value;
        let c = currentDay.value;
        if(a ===0){     
              if(b===0)
                {   
                    if(i-c>=0&&i-c<7)
                    return i;
               
                }
                else if(b===1){
                    c = c + 7 - actualInMonth.value;
                    if(i<c)
                    return i;
                }
            
        }
        else if(a===1)
        {
            b = b + 12;
            if(b===1)
            {
                c = c + 7 - actualInMonth.value;
                if(i<c)
                return i;
            }
         
            
        }
    

    }

        const isToday = (day) => {
            const now = new Date();
            return (
                day === 26 &&
                currentMonth.value === now.getMonth() &&
                currentYear.value === now.getFullYear()
            );
        };

        const prevMonth = () => {
            if (currentMonth.value === 0) {
                currentMonth.value = 11;
                currentYear.value--;
            } else {
                currentMonth.value--;
            }
            generateCalendar();
        };

        const nextMonth = () => {
            if (currentMonth.value === 11) {
                currentMonth.value = 0;
                currentYear.value++;
            } else {
                currentMonth.value++;
            }
            generateCalendar();
        };

        onMounted(() => {
            generateCalendar();
        });
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