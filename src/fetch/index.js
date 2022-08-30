import Axios, { AxiosError } from "axios";
import storage from "@/utils/storage";
import { message } from "ant-design-vue";
import { decrypt, encrypt } from "@/utils/encrypt";
import { ACCESS_IV_KEY, ACCESS_SECRET_KEY, ACCESS_TOKEN } from "@/common/constant";
import { isString } from "@/utils/verify";
import { ControlLoading, isHideLoadingAry } from "../common/loading";
import { handleErrorCode } from "./option";

// 增加/删除 请求个数
const [addRequestNum, minusRequestNum] = ControlLoading();

// 判断是否隐藏 Loading
const isHideLoading = (config) =>
  config && (isHideLoadingAry.includes(config.url) || config.HideLoading);

// 创建 Axios 实例
const instance = Axios.create({
  timeout: 0,
  withCredentials: true,
  baseURL: process.env.VUE_APP_BASE_URL,
});

// 添加请求拦截
instance.interceptors.request.use(
  (config) => {
    const source = Axios.CancelToken.source();
    config.cancelToken = source.token;
    addRequestNum(config.url, source.cancel, isHideLoading(config));
    const token = storage.get(ACCESS_TOKEN);
    token && (config.headers.Authorization = `Bearer ${token}`);
    console.log(
      `[Fetch Request] 🤞...: ${config.url} -- ${config.method} \n%s`,
      `params: ${JSON.stringify(config.data)}`
    );
    !config.NoEncryption &&
      config.data &&
      (config.data = {
        param: encrypt(storage.get(ACCESS_SECRET_KEY), storage.get(ACCESS_IV_KEY), config.data),
      });
    return config;
  },
  (error) => Promise.reject(error)
);

// 添加响应拦截
instance.interceptors.response.use(
  (response) => {
    let { data: result } = response;
    const { url, method } = response.config;
    minusRequestNum(url, isHideLoading(response.config));
    try {
      isString(result) &&
        (result = JSON.parse(
          decrypt(storage.get(ACCESS_SECRET_KEY), storage.get(ACCESS_IV_KEY), result)
        ));
    } catch (error) {
      console.log("[Fetch decrypt error]: ", error.message);
    }
    console.log(`[Fetch Response] 🤫...: ${url} -- ${method} \nbody: `, result);
    const { data, msg, code, success } = result;
    if (!success) {
      handleErrorCode(code, msg);
      return Promise.reject(result);
    }
    return data;
  },
  (error) => {
    !isHideLoading(error.config) && minusRequestNum();
    error.code !== AxiosError.ERR_CANCELED &&
      message.error(`Error：${error?.response?.data?.error || "Network error"}`);
    return Promise.reject(error);
  }
);

export default instance;

export const { get, head, options, post, put, patch, delete: del } = instance;
