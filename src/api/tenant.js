import { post } from "@/fetch";

// 获取租户列表
export const getPortalPage = (params) => post("/console/portal/getPortalPage", params);

// 根据 ID 获取租户信息
export const getPortalById = (id) => post("/console/portal/getPortalById", { id });

// 更改功能管理
export const savePortalManageModule = (params) =>
  post("/console/portal/savePortalManageModule", params);

// 更改租户信息
export const savePortal2BaseInfo = (params) => post("/console/portal/savePortal2BaseInfo", params);

// 账号同步配置
export const savePortal2AADSetting = (params) =>
  post("/console/portal/savePortal2AADSetting", params);

// 获取用户列表
export const getPortalUserList = (params) =>
  post("/console/portal/getPortalUserList", params, { HideLoading: true });

// 设置管理员
export const savePortal2AdminEmail = (params) =>
  post("/console/portal/savePortal2AdminEmail", params);

// 获取初始化进度
export const getPortalInitProcessList = (id) =>
  post("/console/portal/getPortalInitProcessList", { id });
