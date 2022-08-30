import { Modal, Input, Avatar, Button, FormModel, Table, Pagination } from "ant-design-vue";

export default {
  install(Vue) {
    Vue.use(Modal);
    Vue.use(Input);
    Vue.use(Avatar);
    Vue.use(Button);
    Vue.use(FormModel);
    Vue.use(Table);
    Vue.use(Pagination);
  },
};
