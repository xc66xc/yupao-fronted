<template>
  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="`${team.name}`"
        :thumb="duola"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{teamStatusEnum[team.status]}}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{`最大人数: `+ team.maxNum}}
        </div>
        <div v-if="team.expireTime">
          {{`过期时间: `+ team.expireTime}}
        </div>
        <div>
          {{`创建时间: `+ team.createTime}}
        </div>
      </template>
      <template #footer>
        <div id="teamFooter">
          <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
          <van-button v-if="team.userId === currentUser?.id" size="small" type="primary" plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
          <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && team.hasJoin" plain @click="doQuitTeam(team.id)">退出队伍</van-button>
          <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain @click="doDeleteTeam(team.id)">解散队伍</van-button>
        </div>
      </template>
    </van-card>
  </div>

</template>

<script setup lang="ts">
import {TeamType} from "../models/team"
import {teamStatusEnum} from "../constants/team";
import duola from "../assets/duola.jpg"
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUserState} from "../config/states/user";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";
interface TeamCardListProps {
  teamList: TeamType[];
}

const router = useRouter();

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as teamType[],
});

const doJoinTeam = async (id : number) => {
  const res = await myAxios.post('/team/join',{
    teamId:id
  });
  if (res?.code === 0) {
    Toast.success("加入成功");
  } else{
    Toast.fail('加入失败' + (res.description ? `, ${res.description}` : ''));
  }
}

const currentUser = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit',{
    teamId:id
  });
  if (res?.code === 0) {
    Toast.success("操作成功");
  } else{
    Toast.fail('操作失败' + (res.description ? `, ${res.description}` : ''));
  }
}
/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete',{
    id,
  });
  if (res?.code === 0) {
    Toast.success("操作成功");
  } else{
    Toast.fail('操作失败' + (res.description ? `, ${res.description}` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 115px;
  width: 90px;
  object-fit: unset;
}
#teamFooter {
  display: flex;
  justify-content: space-between;
}
</style>