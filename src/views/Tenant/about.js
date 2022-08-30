import moment from "moment";
import { DATE_FORMAT_YY_MM_DD_H_M_S } from "@/common/constant";

export const columns = [
  { width: 180, title: "租户id", dataIndex: "id" },
  { title: "租户名称", dataIndex: "name" },
  { title: "租户Logo", dataIndex: "logoPath", scopedSlots: { customRender: "logo" } },
  { title: "租户管理员", dataIndex: "adminEmail" },
  {
    width: 190,
    title: "初始化状态",
    dataIndex: "initStatus",
    scopedSlots: { customRender: "status" },
  },
  {
    width: 180,
    title: "初始化完成时间",
    dataIndex: "initTime",
    customRender: (text) => text && moment(text - 0).format(DATE_FORMAT_YY_MM_DD_H_M_S),
  },
  { width: 100, title: "操作", dataIndex: "action", scopedSlots: { customRender: "action" } },
];

export const initStatusMap = {
  wait: { type: "clock-circle", text: "等待初始化" },
  ready: {
    type: "check-circle",
    theme: "filled",
    text: "初始化已完成",
    style: { color: "#2E83FF" },
  },
  initializing: { type: "loading", text: "正在初始化...", style: { color: "#2E83FF" } },
  tips: { text: "需由租户管理员前往Admin Center进行配置后方可使用" },
};

export const initColumns = [
  { title: "项目", dataIndex: "serviceName" },
  { title: "初始化进度", dataIndex: "serviceInitStatus", scopedSlots: { customRender: "status" } },
];

export const basicConfigList = [
  { name: "Tenant ID :", key: "tenantId" },
  { name: "Client ID :", key: "clientId" },
  { name: "Client_secret :", key: "clientSecret" },
  { name: "Object ID :", key: "objectId" },
];
