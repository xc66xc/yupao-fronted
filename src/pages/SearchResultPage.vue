<template>
  <user-card-list :userList="userList"></user-card-list>

  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />

</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
const route = useRoute();
const {tags} = route.query;
const userList = ref([]);


onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
      .then(function (response) {
        console.log('/user/search/tags success',response);
        return response?.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error',error);
        Toast.fail('请求失败！');
      })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})



// const mockUser = {
//   id: 12345,
//   username: 'xcxcxc',
//   userAccount: '12341',
//   avatarUrl: 'https://img2.baidu.com/it/u=3744598050,4191464688&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1662915600&t=94385486c2a8fa41c0699a494a5fc013',
//   profile: 'u哟啊是的分红欧式的房间里卢卡斯就打发士大夫 卡拉但即使分开了爱上了咯技术的法拉利是扩大解放',
//   gender: 1,
//   phone: '123123123123',
//   email: '123123@qq.com',
//   userRole: 1,
//   planetCode:'123',
//   tags: ['java','emo','c++','c++','c++','c++'],
//   createTime: new Date(),
// };

</script>

<style scoped>

</style>