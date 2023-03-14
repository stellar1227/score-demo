<script setup>
//select component => 날짜 불러오기 , 선택해서 컴포넌트 테이블에 넘기기
//GameList + queryString router 설정 
//
import {ref, onMounted} from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';



const route = useRoute();
const gameListValue = ref();
const gameList = ref([ // game회차는 하루에 1개로 가정 - 이 데이터는 서버에서 초기에 호출해서 불러옴 // 추후에 store에서 관리 
    {
        date : '2022-10-10',
        id : '#1', //gameId는 newGame생성시 서버에서 할당,
        time : '', 
    },
    {
        date : '2022-10-12',
        id : '#2',
        time : ''
    }
]);

const selectedClub = ref([]);
const selectedUser = ref([]);
const clubLists = ref([]); //getStore

axios({
    method : 'get',
    url : 'http://scorebook.com/api/getclublist',

}).then((res) => {
    clubLists.value = res.data;
})

const clubMemberList = ref([]);
const userList = ref([]);
function reqUserList(){
    const data = {
        cid : selectedClub.value
    }

    const url = 'http://scorebook.com/api/getfencerlist';
    
   
    axios({
        method : 'post',
        url : url,
        data : JSON.stringify(data),
    }).then((res) => {
        console.log('data',res)
        clubMemberList.value = res.data;
    })
 
}






// const userList = ref([]); //새 게임 생성시 초기값

let gameId = 0; //초기 값 맨처음 받아올것 


const scoreTable = ref( //새 게임 생성시 초기값
    {
        
    }
)


function plusGameHanlder(){
    userList.value.push(selectedUser.value);
    let newScore = [];
    for(let i = 0; i < userList.value.length; i++){
        if(i === userList.value.length-1){
            newScore.push({
                name : name,
                value : null,
                isEditable : false,
            })
        }else{
            newScore.push({
                name : userList.value[i],
                value : 0,
                isEditable : false
            });
        }
    }
    console.log(newScore)
    scoreTable.value.games.map(e => {
        e.score.push({
            name : name,
            value : 0,
            isEditable : false
        })
    });

    scoreTable.value.games.push({
        gameId : gameId++,
        name: name,
        score : newScore
    });
}

//게임 불러오기
const gameData = ref({});

const sheetNum = route.query.gameId;

if(sheetNum){
    const data = {
        sheet : sheetNum
    };

    axios({
        method : 'post',
        url : 'http://scorebook.com/api/getgameresult',
        data : JSON.stringify(data)
    }).then((res) => {
        scoreTable.value = res.data;
        console.log(res.data)
        //scoreTable을 중복된 플레이어 기준으로, 로우에 반복될수있도록 재가공필요 
        const pidList = [...new Set(scoreTable.value.map(e => e.pid1))]; //동일 아이디를 뽑아서
        userList.value = [...new Set(scoreTable.value.map(e => e.pname1))];//동일 인물 뽑아내기
        scoreTable.value = pidList.map((e, i) => {
            let arr = scoreTable.value.filter(id => id.pid1 == e);
            arr.splice(i, 0, {'pid1' : e , 'pid2' : e});
            return arr;
    });
    console.log(scoreTable.value)
    
})

}



function changeScore(item,col,row){
    scoreTable.value[col][row].score2 = item;
}
</script>
<template>
    <VRow>
        <VCol>
            <VBtn>
                Save Game
            </VBtn>
        </VCol>
        <VCol>
            <!-- <VBtn @click="plusGameHanlder()">
                Plus Game
            </VBtn> -->
            <VSelect v-model="selectedClub" variant="outlined" density="compact" :items="clubLists" item-title="cname" item-value="cid" @update:model-value="reqUserList">
            </VSelect>
        </VCol>
        <VCol><!-- userList : checkbox로 뿌려줌-->
            <VSelect v-model="selectedUser" variant="outlined" density="compact" :items="clubMemberList" item-title="pname" item-value="pname" @update:model-value="plusGameHanlder">
            </VSelect>
            <!-- <VCheckbox v-model="userList" v-for="member in clubMemberList" :label="member.pname" :value="member.pname" @change="plusGameHanlder(member.pname)"></VCheckbox> -->
        </VCol>
        <VCol cols="4" v-if="gameList">
            <VAutocomplete
            v-model="gameListValue"
            :items="gameList"
            item-title="date"
            item-value="id"
            placeholder="게임날짜를 선택하세요"
            >
            </VAutocomplete>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="2">
            <VList :items="userList" density="compact"></VList>
        </VCol>
        <VCol>
            <!-- <VTable v-if="scoreTable.games.length" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th v-for="(game, idx) in scoreTable.games">{{ idx + 1 }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(game, idx) in scoreTable.games">
                        <th>{{ idx + 1 }}</th>
                        <td v-for="score in games.score">

                        </td>
                    </tr>
                </tbody>
            </VTable> -->
            <VTable density="compact">
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="(user, idx) in userList">{{idx + 1}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(gameList, idx) in scoreTable">
                        <td>{{idx + 1}}</td>
                        <td v-for="(game, num) in gameList">
                            <template v-if="game.pid1 === game.pid2">
                                <span class="me">나</span>
                            </template>
                            <template v-else>
                                <input type="number" v-model="game.score1" @change="changeScore(game.score1,num, idx)"/>
                                <span :class="{'victory' : game.score1 > game.score2 }">{{ game.score1 > game.score2 ? 'V' : 'L' }}</span>
                            </template>
                            <!-- <input type="number" v-model="game.score1" /> -->
                            <!-- <span v-else @click="score.isEditable = score.value !== null ? true : false">{{score.value === null ? 'X' : score.value}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </VTable>
        </VCol>
    </VRow>
    <!-- {{ scoreTable }}
    {{ userList  }} -->
</template>
<style lang="scss">
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"]{
    width:100%;
}
table{
    table-layout:fixed;
    td{
        input{cursor:pointer};
        span{
            display: block;
            color:green;
            &.victory{
                color:red;
            }
            &.me{
                color:black;
                font-weight:bold;
            }
        }
    }
}
</style>
