<template>
    <div class="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
        <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700">
                    <img src="../assets/img/hospital.jpg"/>
                </div>
                <h1 class="text-lg font-semibold text-gray-800 dark:text-gray-200">在线问诊</h1>
            </div>
            
        </header>
        <div class="flex-1 p-6 overflow-y-auto" style="background-color: #e3d9f2;" >
           <div class="space-y-4" v-for="item in chatList" :key="item">
                <div v-if="item.type === 'ai'" class="flex items-start">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700">
                        <img src="../assets/img/doctor.jpg"/>
                    </div>
            
                    <div class="ml-3 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 max-w-[70%]" >
                        <p class="text-gray-800 dark:text-gray-200" display="none">
                            {{ item.content }}
                        </p>
                    </div>
                </div>
  
                <div v-else-if="item.type === 'self'" class="flex items-start justify-end">
                    <div class="bg-blue-500 dark:bg-blue-700 rounded-lg px-4 py-3 max-w-[70%]">
                        <p class="text-white">
                            {{ item.content }}
                        </p>
                    </div>
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 ml-3">
                        <img src="../assets/img/user.jpg"/> 
                    </div>
                </div>
    
            </div>
        </div>
        <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex items-center">
            <input
                    class="flex-1 bg-gray-100 dark:bg-gray-700 border-none rounded-lg py-2 px-4 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="输入您的消息..."
                    type="text"
                    v-model="content"
            />
            <button class="ml-4 bg-blue-500 dark:bg-blue-700 text-white rounded-lg px-4 py-2 hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" @click="sendMsg()">
                发送
            </button>
            <div class="ml-4 flex items-center space-x-2">
                <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                    >
                        <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </button>
                <button class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                    >
                        <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    </template>
    <script>
     import { reactive, ref, watch } from 'vue';
     import axios from 'axios';
     import qs from 'qs';

    export default {
       
        setup()
        {   
            const content = ref("");
            const chatList =reactive([
                {
                    type: "",
                    content: ""
                }]
            );
            const role_select = ref(0);
            const constrole=0;
            function sendMsg(){
                chatList.push({
                    type: "self",
                    content: content.value
                });
              
                let data1 = {
                    prompt: content.value,
                    maxTokens: 100
                }
                content.value = "";
                axios({
                    url: "api/ai/mind",
                    method: 'POST',
                    data: qs.stringify(data1),
                }).then(response => {
                    console.log(response.data);
                    chatList.push({
                        type: "ai",
                        content: response.data.data.answer
                    });
                   
                    
                }); 
            }
            watch(role_select, (newVal, oldVal) => {
                console.log(newVal, oldVal);
                if(newVal!=constrole){
                    chatList.length=0;
                }
            });
    
            return {
                role_select,
                sendMsg,
                constrole,
                chatList,
                content
                    }
        }
    }
    </script>
    <style>
    @import url("https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css");
    </style>