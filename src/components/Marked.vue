<template>
    <div v-html="aaa" style="width: 500px; text-align: left;">

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {marked} from 'marked'
import markedKatex from "marked-katex-extension";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
const aaa = ref('')
// const markedownText = ref(`
// # 제목1
// ## 제목2
// - 1. 목차
// - 2. 목차

// _sf_
// __sda__
// ___asdas___
// ____saddsa____
// *sdfs*

// <br>

// \`\`\`javascript
// const highlight = "code";
// function aaa () {
//     return 1
// \}
// \`\`\`

// $\(\frac{a_i}{1+x}\)$

// ![alt]("sds")
// `)
const markedownText = ref(`
# 제목1
## 제목2
- 1. 목차
- 2. 목차

_sf_
__sda__
___asdas___
____saddsa____
*sdfs*

<br>

\`\`\`javascript
const highlight = "code";
function aaa () {
    return 1
\}
\`\`\`

$
c = \\pm\\sqrt{a^2 + b^2}
$

$$
\\begin{array}{cc}
   a & b \\\\
   c & d
\\end{array}
$$
`)
const getMarkDown = () => {
    const output = marked(markedownText.value, {
        // async: true,
        // pedantic: false,
        // gfm: true,
        // mangle: false,
        // headerIds: false,
    });
    return output
}
onMounted(() => {
    marked.use(markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }));
    marked.use(markedKatex({ nonStandard: true }));
    markedownText.value = marked(markedownText.value)
    aaa.value = getMarkDown()
})
</script>

<style lang="scss" scoped>

</style>