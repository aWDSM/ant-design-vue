import Axios from "axios";
import storage from "@/utils/storage";
import { message } from "ant-design-vue";
import { ControlLoading, isHideLoadingAry } from "../common/loading";

// 增加/删除 请求个数
const [addRequestNum, minusRequestNum] = ControlLoading();

// 判断是否隐藏 Loading
const isHideLoading = (config) =>
  config &&
  ((config.responseType && config.responseType !== "json") ||
    isHideLoadingAry.includes(config.url) ||
    config.headers.HideLoading);

// 创建 Axios 实例
const instance = Axios.create({
  timeout: 0,
  withCredentials: true,
  baseURL: process.env.VUE_APP_BASE_URL,
});

// 添加请求拦截
instance.interceptors.request.use(
  (config) => {
    !isHideLoading(config) && addRequestNum();
    const token = storage.get("token");
    config.headers.Authorization = token && token !== "" ? `Bearer ${token}` : "";
    console.log(
      `[Fetch Request] 🤞...: ${config.url} -- ${config.method} \n%s`,
      `params: ${JSON.stringify(config.data)}`
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// 添加响应拦截
instance.interceptors.response.use(
  (response) => {
    !isHideLoading(response.config) && minusRequestNum();
    const { data } = response;
    const { url, method, responseType } = response.config;
    console.log(`[Fetch Response] 🤫...: ${url} -- ${method} \nbody: `, data);
    if (!data.success && (!responseType || responseType === "json"))
      message.error(`Error：${data.msg}`);
    return data;
  },
  (error) => {
    !isHideLoading(error.config) && minusRequestNum();
    message.error(`Error：${error.response.data?.error || "Network error"}`);
    return Promise.reject(error);
  }
);

export default instance;

export const { get, head, options, post, put, patch, delete: del } = instance;
