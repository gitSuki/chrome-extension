import { createApp } from 'vue'
import App from '../view/popup.vue'
import Title from '../components/Title.vue'
import Searchbar from '../components/Searchbar.vue'

const app = createApp(App)
app.component('Title', Title)
app.component('Searchbar', Searchbar)
const mountedApp = app.mount('#app')