<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>

  <user-card-list :userList="userList" :loading="loading"></user-card-list>

  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />

</template>
<script setup lang="ts">

import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";


const userList = ref([]);
const loading = ref(true);
const isMatchMode = ref<boolean>(false);



const loadData = async () => {
  let userListData;
  loading.value = true;
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },

    })
        .then(function (response) {
          return response?.data;
        })
        .catch(function (error) {
          Toast.fail('请求失败！');
        })
  } else {
     userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },

    })
        .then(function (response) {
          console.log('/user/recommend',response);
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend',error);
          Toast.fail('请求失败！');
        })
  }
  if (userListData) {
    userListData.forEach((user: UserType)=> {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})


</script>

<style scoped>

</style>