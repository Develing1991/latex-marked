<template>
    <div v-html="aaa" style="width: 500px; text-align: left;">

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {marked} from 'marked'
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
const aaa = ref('')
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

$\(\frac{a_i}{1+x}\)$

![alt]("sds")
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
const isMarkdown = (text) => {
  try {
    const tokens = marked.lexer(text);
    
    // 확인할 마크다운 타입 목록
    const markdownTypes = [
      'heading', 'list', 'blockquote', 'code', 'table', 'html', 'hr',
      'strong', 'em', 'codespan', 'del', 'link', 'image', 'br'
    ];
    // 마크다운 토큰이 있으면 true 반환
    return tokens.some((token) => {
      if (markdownTypes.includes(token.type)) {
        return true; // 마크다운 타입 발견
      }
      // "paragraph" 내부에서 추가 마크다운 구문 검사
      if (token.type === 'paragraph') {
        const markdownRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|~~.*?~~|\[.*?\]\(.*?\)|!\[.*?\]\(.*?\))/;
        return markdownRegex.test(token.raw);
      }
      return false;
    });
    // space: 공백
// paragraph: 문단 (평문 포함)
// list_item: 리스트 아이템 (리스트 내부의 개별 항목)
// br: 줄바꿈 ( \n) -> space

// codespan: 인라인 코드 (inline code)

// itaric: _sdf_                    -> pharagraph
// del: 취소선 (~~strikethroug~~)     -> pharagraph
// link: 링크 ([title](url))         -> pharagraph
// image: 이미지 (![alt](url))        -> pharagraph
  } catch (error) {
    console.error('Error while parsing markdown:', error);
    return false;
  }
};
onMounted(() => {
    marked.use(markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    }));
console.log(isMarkdown('$$\(\frac{a_i}{1+x}\)$$')); // false
// console.log(isMarkdown('\n')); // false
// console.log(isMarkdown('hi')); // false
// console.log(isMarkdown('__itaric__')); // true -> false
// console.log(isMarkdown('~~취소선~~')); // true -> false
// console.log(isMarkdown('### sdf')); // true
// console.log(isMarkdown('![alt]("http")')); // true
// console.log(isMarkdown('``` function aa {} ```')); // true
isMarkdown('hi')
    markedownText.value = marked(markedownText.value)
    aaa.value = getMarkDown()
})
</script>

<style lang="scss" scoped>

</style>