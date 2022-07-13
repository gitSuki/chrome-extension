import { createApp } from 'vue'
import App from '../view/popup.vue'
import Title from '../components/Title.vue'
import Searchbar from '../components/Searchbar.vue'
import Button from '../components/Button.vue'

const app = createApp(App)
app.component('Title', Title)
app.component('Searchbar', Searchbar)
app.component('Button', Button)
const mountedApp = app.mount('#app')