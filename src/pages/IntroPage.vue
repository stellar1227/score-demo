<script setup>
//클럽 및 유저 정보 추가 시, MODAL UI이용
//NewGame의 경우 game페이지로 이동 
//Game불러오기의 경우 game페이지로 이동 
import {ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Dialog from '@/components/Dialog.vue';

const router = useRouter();

const clubAddModal = ref(false);
const userAddModal = ref(false);
const selectedClub = ref();
const selectedGame = ref();


const clubLists = ref([
    {
        id : 101,
        name : '성수동클럽',
        info : '성수동'
    },
    {
        id : 102,
        name : '제주시클럽',
        info : '제주시'
    },
    {
        id : 103,
        name : '서귀포시클럽',
        info : '서귀포'
    }
])

const userLists = ref([
    {
        id : 10101,
        name : '이브라',
        info : '중급다이버',
        clubInfo : {
            id : 101,
            name : '성수동클럽',
            info : '성수동'
        }
    },
    {
        id : 10103,
        name : '미징징',
        info : '초급다이버',
        clubInfo : {
            id : 103,
            name : '서귀포시클럽',
            info : '서귀포'
        }
    },
])

//gameList조회 
const gameLists = [
    {
        id : 1,
        date : '2022-11-11',
        time : '23:10',
    },
    {
        id : 2,
        date : '2022-11-13',
        time : '23:10',
    },

]

function clubSaveHandler(){
    alert('axios로 저장보내기 결과에 따라 동일클럽이름 확인');
    clubAddModal.value = false;
}

function userSaveHandler(){
    alert('axios로 저장보내기 결과에 따라 동일사용자 확인');
    userAddModal.value = false;
}

function newGameHanlder(){
    router.push({ path: '/Game' });
}

function loadGameHandler(){
    //gameLists model로 조회
}

</script>
<template>
<VCard 
    class="mx-auto pa-12 pb-8"
    elevation="8"
    max-width="448"
    rounded="lg">
    <h1 class="mb-4">Intro</h1>
    <VRow justify="center" class="mb-4">
        <VCol>
            <VBtn block
            color="blue"
            size="large"
            variant="tonal"
            @click="clubAddModal = true">Club Add</VBtn>
            <Dialog v-model="clubAddModal" title="클럽추가" sub-title="클럽등록하기">
                <template #contents>
                    <VTextField label="클럽명" variant="outlined"></VTextField>
                    <VTextField label="클럽정보" variant="outlined"></VTextField>
                </template>
                <template #actions>
                    <VBtn color="primary" variant="tonal" @click="clubSaveHandler">저장</VBtn>
                </template>
            </Dialog>
        </VCol>
    </VRow>
    <VRow justify="center" class="mb-4" v-if="clubLists">
        <VCol>
            <VBtn block
            color="blue"
            size="large"
            variant="tonal"
            @click="userAddModal = true">User Add</VBtn>
            <Dialog v-model="userAddModal" title="사용자추가" sub-title="사용자등록하기">
                <template #contents>
                    <VSelect v-model="selectedClub" :items="clubLists" item-title="name" item-value="id" label="소속클럽" variant="outlined"></VSelect>
                    <VTextField label="사용자명" variant="outlined"></VTextField>
                    <VTextField label="사용자정보" variant="outlined"></VTextField>
                </template>
                <template #actions>
                    <VBtn color="primary" variant="tonal" @click="userSaveHandler">저장</VBtn>
                </template>
            </Dialog>
        </VCol>
    </VRow>
    <VRow justify="center" class="mb-4">
        <VCol>
            <VBtn block
            color="blue"
            size="large"
            variant="tonal"
            @click="newGameHanlder">New Game</VBtn>
        </VCol>
    </VRow>
    <VRow justify="center" class="mb-4" v-if="gameLists">
        <VCol class="d-flex">
            <VSelect v-model="selectedGame" :items="gameLists" item-title="date" item-value="id" variant="outlined" density="compact" hide-details="auto" class="mr-4">Game List</VSelect>
            <VBtn
            color="blue"
            size="large"
            variant="tonal"
            @click="loadGameHandler">Game Load</VBtn>
        </VCol>
    </VRow>
</VCard>

</template>
<style lang="scss" scoped>
.v-card{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    min-width: 50%;
    max-width: 80%;
}
</style>