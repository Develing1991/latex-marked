<template>
    <div ref="katexRef1">
    </div>
    <br/>
    <div ref="katexRef2">
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import katex from 'katex';
import 'katex/dist/katex.min.css';
const katexRef1 = ref();
const katexRef2 = ref();

const callApi = async () => {
    return await new Promise((res, _res) => res('\\frac{1}{2}'))
}

onMounted(async () => {
    const katexRef1Value = await callApi()
    nextTick(() => {
        katex.render(katexRef1Value, katexRef1.value, {
            throwOnError: false
        });
    })
    
    katex.render(`c = \\pm\\sqrt{a^2 + b^2}`, katexRef2.value, {
        // throwOnError: false
    });
    
})
</script>

<style lang="scss" scoped>

</style>