import './assets/main.css'

import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import PrimeVue from 'primevue/config'

// Ícones do Primevue
import 'primeicons/primeicons.css'

// Componentes PrimeVue (importando apenas os que serão usados)
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataView from 'primevue/dataview'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import ToggleSwitch from 'primevue/toggleswitch'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import OverlayBadge from 'primevue/overlaybadge'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      200: '{teal.200}',
      300: '{teal.300}',
      400: '{teal.400}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
      800: '{teal.800}',
      900: '{teal.900}',
      950: '{teal.950}',
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.dark',
    },
  },
})

app.component('pButton', Button)
app.component('pCard', Card)
app.component('pDataView', DataView)
app.component('pConfirmDialog', ConfirmDialog)
app.use(ConfirmationService)
app.component('pToggleSwitch', ToggleSwitch)
app.component('pMenubar', Menubar)
app.component('pAvatar', Avatar)
app.component('pBadge', Badge)
app.component('pOverlayBadge', OverlayBadge)

app.mount('#app')
