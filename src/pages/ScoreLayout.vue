<script setup>
//select component => 날짜 불러오기 , 선택해서 컴포넌트 테이블에 넘기기
//GameList + queryString router 설정 
//
import {ref} from 'vue';
import axios from 'axios';
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
   
    

//alert('axios로 selectedClub.value 조회하여  소속 유저 불러옴')
    // clubMemberList.value = [ //TODO : 유저를 이렇게 이용하려면, 유저정보가 가진 게임 정보 처리와, 소속 클럽아이디도 있어야하지않을까.
    //     {
    //         pid : '3',
    //         pname : '유성원',
    //         psex : 'M',
    //         ptype: 'epee',
    //         cname : '대전펜싱클럽',
    //         pnote : ''
    //     },
    //     {
    //         pid : '5',
    //         pname : '이성원',
    //         psex : 'M',
    //         ptype: 'foil',
    //         cname : '대전펜싱클럽',
    //         pnote : ''
    //     },
    //     {
    //         pid : '10',
    //         pname : '유성투',
    //         psex : 'M',
    //         ptype: 'epee',
    //         cname : '대전펜싱클럽',
    //         pnote : ''
    //     },
    //     {
    //         pid : '313',
    //         pname : '무성원',
    //         psex : 'M',
    //         ptype: 'epee',
    //         cname : '대전펜싱클럽',
    //         pnote : ''
    //     }
    // ]
}

//dataset
//1. player 정보 - user추가/삭제 시 axios 전송 (수정은 어쩔까)
//2. gameList 정보 - game생성/추가/삭제 시 axios 전송 아래랑 묶어서
//3. gameList에 해당하는 games - game 추가/수정/삭제 시 axios전송


//scroeTable 구성 데이터 회차선택시 axios를 통해서 리퀘스트 받은 값을 넣음 
// const userList = ref([
//     'A', 'B', 'C', 
// ])





// const userList = ref([]); //새 게임 생성시 초기값

let gameId = 0; //초기 값 맨처음 받아올것 
// const scoreTable = ref( 
//     {
//         gameListId : '#1',
//         date : '2022-10-10', 
//         games : [
//             {
//                 gameId : gameId++,
//                 name : 'A',
//                 score : [
//                     {
//                         name : 'A',
//                         value : null,
//                         isEditable : false,
//                     },
//                     {
//                         name : 'B',
//                         value : 1,
//                         isEditable : false,
//                     },
//                     {
//                         name : 'C',
//                         value : 2,
//                         isEditable : false,
//                     }
//                 ],
//             },
//             {
//                 gameId : gameId++,
//                 name : 'B',
//                 score : [{
//                         name : 'A',
//                         value : 2,
//                         isEditable : false,
//                     },
//                     {
//                         name : 'B',
//                         value : null,
//                         isEditable : false,
//                     },
//                     {
//                         name : 'C',
//                         value : 4,
//                         isEditable : false,
//                     }],
//             },
//             {
//                 gameId : gameId++,
//                 name : 'C',
//                 score : [{
//                         name : 'A',
//                         value : 0,
//                         isEditable : false,
//                     },
//                     {
//                         name : 'B',
//                         value : 9,
//                         isEditable : false,
//                     },
//                     {
//                         name : 'C',
//                         value : null,
//                         isEditable : false,
//                     }],
//             }
//         ]
//     }
// )

const scoreTable = ref( //새 게임 생성시 초기값
    {
        gameListId : '#1', // 이 부분도 동적
        date : '2022-10-10', // 이 부분도 데이트 객체화
        games : []
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
const data = {
    sheet : 'eoif274834'
}
axios({
    method : 'post',
    url : 'http://scorebook.com/api/getgameresult',
    data : JSON.stringify(data)
}).then((res) => {
    scoreTable.value = res.data;
    
    //scoreTable을 중복된 플레이어 기준으로, 로우에 반복될수있도록 재가공필요 
    const pidList = [...new Set(scoreTable.value.map(e => e.pid1))];
    userList.value = [...new Set(scoreTable.value.map(e => e.pname1))];
    scoreTable.value = pidList.map(e => {
        return scoreTable.value.filter(id => id.pid1 == e)
    })
    
})
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
        <VCol>
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
                            <template v-if="idx === num">
                                <span>나</span>
                            </template>
                            <template v-else>
                                {{  game.score1  }}
                                <span>{{ game.score1 > game.score2 ? 'V' : 'L' }}</span>
                            </template>
                            <!-- <input type="number" v-model="game.score1" /> -->
                            <!-- <span v-else @click="score.isEditable = score.value !== null ? true : false">{{score.value === null ? 'X' : score.value}}</span> -->
                        </td>
                    </tr>
                </tbody>
            </VTable>
        </VCol>
    </VRow>

    {{ userList  }}
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
        span{
            display: block;
            cursor:pointer;
        }
    }
}
</style>
