<script setup>
//클럽 및 유저 정보 추가 시, MODAL UI이용
//NewGame의 경우 game페이지로 이동 
//Game불러오기의 경우 game페이지로 이동 

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
            variant="tonal">Club Add</VBtn>
        </VCol>
    </VRow>
    <VRow justify="center" class="mb-4">
        <VCol>
            <VBtn block
            color="blue"
            size="large"
            variant="tonal">User Add</VBtn>
        </VCol>
    </VRow>
    <VRow justify="center" class="mb-4">
        <VCol>
            <VBtn block
            color="blue"
            size="large"
            variant="tonal">New Game</VBtn>
        </VCol>
    </VRow>
    <VRow justify="center" class="mb-4">
        <VCol class="d-flex">
            <VSelect variant="outlined" density="compact" hide-details="auto" class="mr-4">Game List</VSelect>
            <VBtn
            color="blue"
            size="large"
            variant="tonal">Game Load</VBtn>
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