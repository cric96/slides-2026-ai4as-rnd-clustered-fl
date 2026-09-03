<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'

const props = defineProps<{
  math: string
  display?: boolean
}>()

const html = computed(() => {
  try {
    return katex.renderToString(props.math, {
      displayMode: props.display ?? false,
      throwOnError: false,
    })
  } catch (e) {
    return props.math
  }
})
</script>

<template>
  <span v-html="html" class="math-tex" />
</template>

<style scoped>
.math-tex {
  display: inline-block;
  line-height: 1;
  vertical-align: -0.05em;
}
.math-tex :deep(.katex) {
  font-size: 1.05em;
}
</style>
