// import EleEasyTable from './components/EleEasyTable.vue';
// import CustomColumn from './components/CustomColumn/index.vue';
// import EleEasyTableEdit from './components/EleEasyTableEdit.vue';
import ProTable from './components/ProTable/index.vue';
import { App } from 'vue';

export default {
  install: (app: App) => {
    // app.component('EleEasyTable', EleEasyTable);
    // app.component('CustomColumn', CustomColumn);
    // app.component('EleEasyTableEdit', EleEasyTableEdit);
    // app.component('ProTable', ProTable);
    app.component('TablePlus', ProTable);
  },
};
