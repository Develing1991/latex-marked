<template>
    <div v-katex="'\\frac{a_i}{1+x}'"></div>
    <br>
    <!-- <div v-katex="'\\frac{a_i}{1+x}'"></div> -->
    <div v-katex:auto="{ options }">
      \(\frac{a_i}{1+x}\)
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>

</style>