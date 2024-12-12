import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueKatex from '@hsorby/vue3-katex';
import 'katex/dist/katex.min.css';

createApp(App)
    .use(VueKatex, {
    globalOptions: {
        //... Define globally applied KaTeX options here
    }
}).mount('#app')
