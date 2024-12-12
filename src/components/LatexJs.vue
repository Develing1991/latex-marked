<template>
    <div v-katex="'$\\frac{1}{2}$'"></div>
    <br>
    <!-- <div v-katex="'\\frac{a_i}{1+x}'"></div> -->
    <div v-katex:auto="{ options }">
      $\(\frac{a_i}{1+x}\)$
    </div>
</template>

<script setup>
import { ref } from 'vue'
const options = ref({})
</script>

<style lang="scss" scoped>

</style>