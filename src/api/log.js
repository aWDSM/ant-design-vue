import { post } from "@/fetch";

// 获取 Log 列表
export const getOperateRecordPage = (params) =>
  post("/console/operateRecord/getOperateRecordPage", params);

// 获取操作详情
export const getOperateRecordById = (id) =>
  post("/console/operateRecord/getOperateRecordById", { id });
