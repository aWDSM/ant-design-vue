import {
  Tabs,
  Icon,
  Spin,
  Modal,
  Table,
  Input,
  Select,
  Switch,
  Avatar,
  Button,
  Upload,
  message,
  FormModel,
  Breadcrumb,
  ConfigProvider,
} from "ant-design-vue";

export default {
  install(Vue) {
    Vue.use(Tabs);
    Vue.use(Icon);
    Vue.use(Spin);
    Vue.use(Modal);
    Vue.use(Table);
    Vue.use(Input);
    Vue.use(Avatar);
    Vue.use(Select);
    Vue.use(Switch);
    Vue.use(Button);
    Vue.use(Upload);
    Vue.use(FormModel);
    Vue.use(Breadcrumb);
    Vue.use(ConfigProvider);

    Vue.prototype.$message = message;
  },
};
