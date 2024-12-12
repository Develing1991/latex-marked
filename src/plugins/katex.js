/**
 * Plugin entry.
 */
import katexDirective from '../directives/katex-directive'
import KatexElement from '../components/KatexElement.vue'
import 'katex/dist/contrib/copy-tex.mjs'
import 'katex/dist/contrib/mhchem.mjs'
import 'katex/dist/contrib/mathtex-script-type.mjs'
import 'katex/dist/contrib/render-a11y-string.mjs'

/**
 * Install function for installing plugin into Vue 3 application.
 *
 * @param {Object} app
 * @param {Object} options
 */
function install(app, options) {
  const katexOptions = (options && options.katexOptions) || {}
  const vKatex = katexDirective(katexOptions)
  app.directive(vKatex.name, vKatex.directive)
  app.component(KatexElement.name, KatexElement)
  app.provide('$katexOptions', katexOptions)
}

export default install