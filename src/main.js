import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import Splitter from "primevue/splitter";
import SplitterPanel from 'primevue/splitterpanel';
import Dialog from "primevue/dialog";
import Button from 'primevue/button';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import InputText from 'primevue/inputtext';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Badge from 'primevue/badge';

createApp(App)
.component("Dialog", Dialog)
.component("Button", Button)
.component("Splitter", Splitter)
.component("SplitterPanel", SplitterPanel)
.component("Tabs", Tabs)
.component("TabList", TabList)
.component("Tab", Tab)
.component("Badge", Badge)
.component("TabPanels", TabPanels)
.component("TabPanel", TabPanel)
.component("InputText", InputText)
.component("Accordion", Accordion)
.component("AccordionPanel", AccordionPanel)
.component("AccordionHeader", AccordionHeader)
.component("AccordionContent", AccordionContent)
.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
.mount('#app')
