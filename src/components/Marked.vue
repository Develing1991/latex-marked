<template>
    <div v-html="markdownText" style="width: 500px; text-align: left;">

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {marked} from 'marked'
import markedKatex from "marked-katex-extension";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
const markdownText = ref('')
const getText = ref(`

|sfdfs|fsdds|sdfds|
|---|---|---|
|fdsfd|fsdfds|fsdds|

# 제목1
## 제목2
1. 모크차
    1. 목차
    1. 목차

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

> sdf
>> dsfsd

\`\`\`javascript
const highlight = "code";
function aaa () {
    return 1
\}
\`\`\`

`)
const getMarkDown = () => {
    const output = marked(getText.value, {
        // async: true,
        // pedantic: false,
        gfm: true,
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
    markdownText.value = getMarkDown()

    // lang, copy button
    document.querySelectorAll('pre').forEach(el => console.log(el))
})
</script>

<style scoped>

:deep(table) {
  border: 2px solid black;
  border-collapse: collapse;
  border-radius: 3px;
  border-style: hidden;
  box-shadow: 0 0 0 1px #000;
  overflow: hidden;

}
:deep(thead){
    border-radius: 10px;
}
:deep(th) {
  background-color: #c2c2c2;
  padding: 10px;
  border: 1px solid black;
}
:deep(td) {
  padding: 10px;
  border: 1px solid black;
}

:deep(blockquote){
    border-left: 2px solid #20c997;
    padding-left: 5px;
    background-color: #f8f9fa;
}

</style>