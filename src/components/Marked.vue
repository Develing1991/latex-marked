<template>
    <div v-html="markdownText" style="width: 500px; text-align: left;">

    </div>
    
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import {marked} from 'marked'
import markedKatex from "marked-katex-extension";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/gradient-light.css';
import ClipboardJS from 'clipboard'
import { v4 as uuidv4 } from 'uuid';
// import { useClipboard } from '@vueuse/core'

// const { text, copy, copied, isSupported } = useClipboard()
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
const highlight = "code1";
function aaa1 () {
    return 1
\}
\`\`\`

sadsad
$ c = \\pm\\sqrt{a^2 + b^2} $
dsadsa

sadsad
$$ c = \\pm\\sqrt{a^2 + b^2} $$
dsadsa

$$
\\begin{array}{cc}
   a & b \\\\
   c & d
\\end{array}
$$

> sdf
>> dsfsd

\`\`\`java
public static void final aaa = "hi";
public String message(String msg){
    return msg;
}
\`\`\`

\`\`\`
public static void final aaa = "hi";
function aaa2 () {
    return 2
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

    nextTick(() => {
        // create codeblock header
        const codeBlocks = document.querySelectorAll('pre')
        codeBlocks.forEach(block => {
            const codeEl = Array.from(block.children).find(child => child.tagName === 'CODE')
            const codeLanguage = Array.from(codeEl.classList).find(className => className.startsWith('language'))?.split('-')[1] ?? 'plain text'
            const codeBlockUuid = uuidv4()
            // const { text, isSupported, copy } = useClipboard()
            const headerWrapperEl = document.createElement('div')
            const codeLanguageEl = document.createElement('div')
            const codeCopyButtonEl = document.createElement('button')

            block.setAttribute('style', 'margin-top: 0px; border-radius: 0 0 5px 5px; overflow: hidden;')
            block.setAttribute('id', `target-${codeBlockUuid}`)
            codeLanguageEl.textContent = codeLanguage
            codeCopyButtonEl.innerHTML = 'COPY'
            codeCopyButtonEl.classList.add(`copy-btn-${codeBlockUuid}`)
            codeCopyButtonEl.setAttribute('data-clipboard-target', `#target-${codeBlockUuid}`)
            codeCopyButtonEl.setAttribute('style', 'padding: 3px 8px; border: none; outline: none; display: flex; justify-content: center; align-items: center; border-radius: 2px;')
            codeCopyButtonEl.addEventListener('click', () => {
                // window.getSelection().removeAllRanges()
                codeCopyButtonEl.innerHTML = 'COPIED'
                codeCopyButtonEl.disabled = true
                codeCopyButtonEl.style.cursor = 'default'
                const timer = setTimeout(() => {
                    codeCopyButtonEl.innerHTML = 'COPY'
                    codeCopyButtonEl.disabled = false
                    codeCopyButtonEl.style.cursor = 'pointer'
                    clearTimeout(timer);
                }, 2000);
            })
            headerWrapperEl.setAttribute('style', 'color: #ebebeb; background-color: #2f2f2f; height: 40px; display:flex; justify-content:space-between; align-items: center; padding: 5px 10px; border-radius: 5px 5px 0 0;')
            headerWrapperEl.append(codeLanguageEl)
            headerWrapperEl.append(codeCopyButtonEl)
            block.parentNode.insertBefore(headerWrapperEl, block);
            new ClipboardJS(`.copy-btn-${codeBlockUuid}`);
        })
    })
   
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