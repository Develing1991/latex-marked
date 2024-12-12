import katex from 'katex'
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs'
import merge from 'deepmerge'

const replaceKatex = (text, type) => {
    const regex = /(\$\$.*?\$\$|\$.*?\$|\\\(.*?\\\)|\\\[.*?\\\])/gs;
    // el.innerHTML = el.innerHTML.replace(/\$([^$]+)\$/g, (match, math) => {
    return text.replace(regex, (match, math) => {
    try {
        const isBlock = match.startsWith("$$") || match.startsWith("\\[");
        const mathContent = match
            .replace(/^\$\$|^\$|^\(\\|^\[\\|\\\)$|\\\]$|\$$/g, "");
        if(type === 'directive'){
            return mathContent
        }
        return katex.renderToString(mathContent, { 
            displayMode: isBlock,
            throwOnError: false 
        });
        
    } catch (e) {
        return match; // 오류가 있으면 원본 반환
    }
    }); 
}
const katexDirective = (globalOptions) => ({
  name: 'katex',
  directive: function (el, binding) {
    const argOptions = (binding.value && binding.value.options) || {}
    const allOptions = merge(globalOptions, argOptions)
    // debugger
    if (binding.arg && binding.arg === 'auto') {
        el.innerHTML = replaceKatex(el.innerHTML, 'innerHtml')
        renderMathInElement(el, allOptions)
    } else {
        const expression = replaceKatex(binding.value.expression || binding.value, 'directive')
        const displayMode = {}
        if (binding.arg === 'display') {
            displayMode.displayMode = true
        }
        const options = merge(allOptions, displayMode)
        katex.render(expression, el, options)
    }
  },
})

export default katexDirective