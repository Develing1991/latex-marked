import katex from 'katex'
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs'
import merge from 'deepmerge'

// `$` 또는 `$$` 제거
const replaceKatex = (text) => {
    const regex = /(\$\$.*?\$\$|\$.*?\$)/gs;
    // const regex = /(\$\$.*?\$\$|\$.*?\$|\\\(.*?\\\)|\\\[.*?\\\])/gs;
    // el.innerHTML = el.innerHTML.replace(/\$([^$]+)\$/g, (match, math) => {
    return text.replace(regex, (match, math) => {
    try {
        
        const isBlock = match.startsWith("$$"); //|| match.startsWith("\\[");
        // const mathContent = match
        //     .replace(/^\$\$|^\$|^\(\\|^\[\\|\\\)$|\\\]$|\$$/g, "");
        const mathContent = match.slice(isBlock ? 2 : 1, isBlock ? -2 : -1); 
        
        // return katex.renderToString(mathContent, { 
        //     displayMode: true,
        //     throwOnError: false 
        // });
        return mathContent
        
    } catch (e) {
        console.error('KaTeX rendering error:', e.message);
        return match; // 오류가 있으면 원본 반환
    }
    }); 
}
const katexDirective = (globalOptions) => ({
  name: 'katex',
  directive: function (el, binding) {
    const argOptions = (binding.value && binding.value.options) || {}
    const allOptions = merge(globalOptions, argOptions)
    if (binding.arg && binding.arg === 'auto') {
        // Auto-render mode
        el.innerHTML = replaceKatex(el.innerHTML )
        renderMathInElement(el, allOptions)
    } else {
        // Manual render mode
        const expression = replaceKatex(binding.value.expression || binding.value)
        const displayMode = binding.arg === 'display' ? { displayMode: true } : {}
        const options = merge(allOptions, displayMode)
        try {
            katex.render(expression, el, options);
        } catch (e) {
            console.error('KaTeX directive error:', e.message);
            el.innerHTML = expression; // 렌더링 실패 시 원본 출력
        }
    }
  },
})

export default katexDirective