<script setup>
//클럽 및 유저 정보 추가 시, MODAL UI이용
//NewGame의 경우 game페이지로 이동 
//Game불러오기의 경우 game페이지로 이동 
import {ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Dialog from '@/components/Dialog.vue';
import axios from 'axios';


const router = useRouter();

const clubAddModal = ref(false);
const userAddModal = ref(false);
const selectedClub = ref();
const selectedGame = ref();


const clubLists = ref([]);

const newClubInfo = ref({
    cname: '',
    ctype: [],
    cnote: ''
});
const newUserInfo = ref({
    pname: '',
    ptype: '',
    psex: '',
    pphone: '',
    pnote: ''
});


//TODO: 전체 유저정보는 조회 필요없음. 유저정보 등록 시 같은경우 서버에서 처리 필 
const userLists = ref([]);

//TODO :gameList조회 /해당날짜의 게임조회 필요함 api 필요 
const gameLists = [ // 응답 파라미터 예시 게임은 아이딧값으로 조회하고싶다.
    {
        sheet : 'eoif274834',
        date: '2023-02-13'
    }

]

function getClubList(){
    this.userAddModal = true
    //클럽목록 조회는 유저등록시에
    axios({
            method : 'get',
            url : 'http://scorebook.com/api/getclublist',
    }).then((res) => {
        clubLists.value = res.data;
    })

}

/** 추후 saveModal HOC로 할수도. */
function clubSaveHandler(){
    const data = {
        action : 'ADD',
        target : 'club',
        cname : newClubInfo.value.cname,
        ctype : newClubInfo.value.ctype,
        cnote : newClubInfo.value.cnote
    }

    const url = 'http://scorebook.com/api/addclub';
    axios({
        method : 'post',
        url : url,
        data : JSON.stringify(data),
    }).then((res) => {
        console.log(res); // Todo: alert메시지 분류해서 내보내기
    })
    clubAddModal.value = false;
}

function userSaveHandler(){
    const data = {
        action: "ADD",
        target: "fencer",
        pname: newUserInfo.value.pname,
        ptype: newUserInfo.value.ptype,
        psex: newUserInfo.value.psex,
        cid: selectedClub.value,
        pphone: newUserInfo.value.pphone,
        pnote: newUserInfo.value.pnote
    }

    axios({
        method : 'post',
        url : 'http://scorebook.com/api/addfencer',
        data : JSON.stringify(data),
    }).then((res) => {
        alert(res.data.message.KR);
    })
    userAddModal.value = false;
}

function newGameHanlder(){
    router.push({ path: '/Game' });
}

function loadGameHandler(){
    if(!selectedGame.value){alert('select a game'); return;}
    router.push({ path: '/Game/Detail', query : { gameId :selectedGame.value }});
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
                    <VTextField v-model="newClubInfo.cname" label="클럽명" variant="outlined"></VTextField>
                    <div class="game-type-list">
                        <VCheckbox
                        v-model="newClubInfo.ctype"
                        label="epee"
                        value="epee"
                        ></VCheckbox>
                        <VCheckbox
                        v-model="newClubInfo.ctype"
                        label="foil"
                        value="foil"
                        ></VCheckbox>
                        <VCheckbox
                        v-model="newClubInfo.ctype"
                        label="sabre"
                        value="sabre"
                        ></VCheckbox>
                    </div>
                    <VTextField v-model="newClubInfo.cnote" label="기타메모사항" variant="outlined"></VTextField>
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
            @click="getClubList()">User Add</VBtn>
            <Dialog v-model="userAddModal" title="사용자추가" sub-title="사용자등록하기">
                <template #contents>
                    <VSelect v-model="selectedClub" :items="clubLists" item-title="cname" item-value="cid" label="소속클럽" variant="outlined"></VSelect>
                    <VTextField v-model="newUserInfo.pname" label="사용자명" variant="outlined"></VTextField>
                    <div class="game-type-list">
                        <VRadioGroup
                        v-model="newUserInfo.ptype"
                        column
                        >
                        <VRadio
                            label="epee"
                            value="epee"
                        ></VRadio>
                        <VRadio
                            label="foil"
                            value="foil"
                        ></VRadio>
                        <VRadio
                            label="sabre"
                            value="sabre"
                        ></VRadio>
                        </VRadioGroup>
                    </div>
                    <div class="game-type-list">
                        <VRadioGroup
                        v-model="newUserInfo.psex"
                        column
                        >
                        <VRadio
                            label="남"
                            value="male"
                        ></VRadio>
                        <VRadio
                            label="여"
                            value="female"
                        ></VRadio>
                        </VRadioGroup>
                    </div>
                    <VTextField v-model="newUserInfo.pphone" label="전화번호" variant="outlined"></VTextField>
                    <VTextField v-model="newUserInfo.pnote" label="사용자정보" variant="outlined"></VTextField>
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
            <VSelect v-model="selectedGame" :items="gameLists" item-title="date" item-value="sheet" variant="outlined" density="compact" hide-details="auto" class="mr-4">Game List</VSelect>
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
.game-type-list{
    display:flex;
    .v-input{
        flex:auto;
    }
    &::v-deep(.v-selection-control-group){
        flex-direction:row;
    }
}
</style>