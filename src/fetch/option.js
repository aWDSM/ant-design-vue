import store from "@/store";
import { message } from "ant-design-vue";

export const handleErrorCode = (code, msg) => {
  switch (code) {
    case 900002:
      return store.dispatch("user/logout");
    default:
      message.error(`Error：${msg || "Network error"}`);
      break;
  }
};
