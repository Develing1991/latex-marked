import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'katex/dist/katex.min.css';
import myKatexPlugin from './plugins/katex'
// createApp(App)
//     .use(VueKatex, {
//     globalOptions: {
//         //... Define globally applied KaTeX options here
//     }
// }).mount('#app')
const app = createApp(App)
app.use(myKatexPlugin)

app.mount('#app')
