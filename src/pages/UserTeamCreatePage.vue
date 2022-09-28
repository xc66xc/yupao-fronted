<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="onSearch"/>
    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
    <team-card-list :teamList = "teamList"></team-card-list>
    <van-empty v-if="teamList?.length < 1" description="数据为空" />
  </div>

</template>

<script setup>
import { useRouter } from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";


const searchText = ref('');

const router = useRouter();
  const doJoinTeam = () => {
    router.push({
      path: "/team/add"
    })
}
const teamList = ref([]);


const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    Toast.fail("加载队伍失败，请重新刷新");
  }
}

onMounted(async () => {
  listTeam('');
})

const onSearch =  (val) => {
  listTeam(val);
};
</script>

<style scoped>
#teamPage{

}
</style>