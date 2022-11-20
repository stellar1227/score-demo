<script setup>
import {computed} from 'vue';
/**
 * Dialog 공통 컴포넌트
 * 타이틀 설정, 서브 타이틀 설정
 * 딤 설정 (esc 키로 닫기 가능)
 * 딤 제거 가능
 * width/height 설정가능 기본은 컨텐츠 사이즈 만큼 auto// 스크롤링 필요시에 height설정
 * 각 모달의 버튼액션은 slot:actions,
 * 각 모달의 컨텐츠영역은 slot:contents
 */
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '',
    },
    subTitle: {
        type: String,
        default: '',
    },
    width: {
        /** Number작성시 px */
        type: [String, Number],
        default: '50%',
    },
    height: {
        /** Number작성시 px */
        type: [String, Number],
        default: 'auto',
    },
    isDim: {
        /** dim 빼기 가능 */
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(['update:modelValue']);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    return emit('update:modelValue', value);
  },
});
</script>
<template>
<VDialog v-model="model" :scrim="props.isDim" :width="props.width">
    <VCard :height="props.height">
      <VCardTitle>
        {{ props.title }}
      </VCardTitle>
      <VCardSubtitle>
        {{ props.subTitle }}
      </VCardSubtitle>
      <VCardText>
        <slot name="contents"></slot>
      </VCardText>
      <VCardActions class="d-flex justify-end">
        <slot name="actions"></slot>
        <VBtn icon="mdi-close" class="md-close" @click="model = false" role="close" />
      </VCardActions>
    </VCard>
  </VDialog>    
</template>
<style lang="scss" scoped>
.md-close {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
