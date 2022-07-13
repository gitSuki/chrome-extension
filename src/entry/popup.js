import { createApp } from 'vue'
import App from '../view/popup.vue'
import Title from '../components/Title.vue'

const app = createApp(App)
app.component('Title', Title)
const mountedApp = app.mount('#app')