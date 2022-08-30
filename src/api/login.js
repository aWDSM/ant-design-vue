import { post } from "@/fetch";

// 获取匿名授权
export const getAnonymousAuth = (requestId) =>
  post("/console/common/getAnonymousAuth", { requestId }, { NoEncryption: true });

// 获取邮箱验证码
export const sendEmailCaptcha = (email) => post("/console/common/sendEmailCaptcha", { email });

// 登陆系统
export const fetchLogin = (params) => post("/console/common/login", params);
