import moment from "moment";
import { DATE_FORMAT_YY_MM_DD_H_M_S } from "@/common/constant";

export const columns = [
  { width: 180, title: "操作人", dataIndex: "userId" },
  { width: 210, title: "操作人邮箱", dataIndex: "email" },
  {
    width: 180,
    title: "操作时间",
    dataIndex: "createdTime",
    customRender: (text) => text && moment(text - 0).format(DATE_FORMAT_YY_MM_DD_H_M_S),
  },
  { title: "操作描述", dataIndex: "recordContent" },
  { title: "租户名称", dataIndex: "portalName" },
  { title: "修改前", dataIndex: "recordItemContent" },
  { width: 130, title: "修改后", dataIndex: "id", scopedSlots: { customRender: "action" } },
];

export const modalColumns = [
  { title: "修改字段", dataIndex: "field" },
  { title: "修改前", dataIndex: "before" },
  { title: "修改后", dataIndex: "after" },
];
