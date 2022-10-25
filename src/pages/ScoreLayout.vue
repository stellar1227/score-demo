<script setup>
//select component => 날짜 불러오기 , 선택해서 컴포넌트 테이블에 넘기기
//GameList + queryString router 설정 
//
import {ref} from 'vue';
const gameListValue = ref();
const gameList = ref([ // game회차는 하루에 1개로 가정 - 이 데이터는 서버에서 초기에 호출해서 불러옴 // 추후에 store에서 관리 
    {
        date : '2022-10-10',
        id : '#1' //gameId는 newGame생성시 서버에서 할당 
    },
    {
        date : '2022-10-12',
        id : '#2'
    }
]);

//dataset
//1. player 정보 - user추가/삭제 시 axios 전송 (수정은 어쩔까)
//2. gameList 정보 - game생성/추가/삭제 시 axios 전송 아래랑 묶어서
//3. gameList에 해당하는 games - game 추가/수정/삭제 시 axios전송


//scroeTable 구성 데이터 회차선택시 axios를 통해서 리퀘스트 받은 값을 넣음 
// const userList = ref([
//     'A', 'B', 'C', 
// ])

const userList = ref([]); //새 게임 생성시 초기값

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
    const userInput = prompt('newName?');
    if(!userInput) return; 
    

    userList.value.push(userInput);
    let newScore = [];
    for(let i = 0; i < userList.value.length; i++){
        if(i === userList.value.length-1){
            newScore.push({
                name : userInput,
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

    scoreTable.value.games.map(e => {
        e.score.push({
            name : userInput,
            value : 0,
            isEditable : false
        })
    });

    scoreTable.value.games.push({
        gameId : gameId++,
        name: userInput,
        score : newScore
    });
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
            <VBtn @click="plusGameHanlder()">
                Plus Game
            </VBtn>
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
        <VTable>
            <thead>
                <tr>
                    <th></th>
                    <th v-for="user in userList">{{user}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in scoreTable.games">
                    <td>{{game.name}}</td>
                    <td v-for="score in game.score">
                        <input type="number" v-model="score.value" v-if="score.isEditable" @blur="score.isEditable = false" />
                        <span v-else @click="score.isEditable = score.value !== null ? true : false">{{score.value === null ? 'X' : score.value}}</span>
                    </td>
                </tr>
            </tbody>
        </VTable>
        {{scoreTable}}
    </VRow>
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
