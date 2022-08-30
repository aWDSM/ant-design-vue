<template>
  <div class="tenant-page">
    <div class="tenant-page-search-box">
      <div class="tenant-page-search-box-l">
        <a-input v-model="keywords" class="input" :placeholder="placeholder"></a-input>
        <a-button class="search search_btn" @click="onSearch">查询</a-button>
        <a-button class="reset search_btn" @click="onReset">重置</a-button>
      </div>
      <a-button class="tenant-page-search-box-r" @click="onAdd">+ 新建租户</a-button>
    </div>
    <div class="tenant-page-table-box">
      <a-table
        bordere
        :data-source="dataSource"
        :columns="columns"
        :pagination="false"
        row-key="id"
      >
        <template slot="logo" slot-scope="text">
          <div v-if="text == ''" class="logo">logo</div>
        </template>
        <template slot="administrators" slot-scope="text">
          {{ text || "- -" }}
        </template>
        <template slot="InitializationStatus" slot-scope="text">
          <template v-if="text == 0">正在初始化…</template>
          <span v-else class="detail">查看详情</span>
        </template>
        <span
          slot="operation"
          slot-scope="text, record"
          class="editor"
          :pagination="{ pageSize: 50 }"
          @click="onEditore(record.key)"
        >
          编辑
        </span>
      </a-table>
      <Pagination
        :v-model="pagination.current"
        :total="pagination.totalCount"
        show-size-changer
        show-quick-jumper
        :page-size="pagination.pageSize"
        @onShowSizeChange="onShowSizeChange"
      ></Pagination>
      <Tenanteditor :visible="visible"></Tenanteditor>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/pagination.vue";
import Tenanteditor from "@/components/tenanteditor.vue";

export default {
  name: "Tenant",
  components: {
    Pagination,
    Tenanteditor,
  },
  data() {
    return {
      keywords: "",
      placeholder: "请输入租户名称",
      dataSource: [
        {
          id: "1",
          name: "租户3",
          logo: "",
          administrators: "",
          InitializationStatus: "0",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
        {
          id: "2",
          name: "租户4",
          logo: "",
          administrators: "",
          InitializationStatus: "1",
          InitializationTime: "2022-07-32 10:21:23",
        },
      ],
      columns: [
        {
          title: "租户id",
          dataIndex: "id",
        },
        {
          title: "租户名称",
          dataIndex: "name",
        },
        {
          title: "租户Logo",
          dataIndex: "logo",
          scopedSlots: { customRender: "logo" },
        },
        {
          title: "租户管理员",
          dataIndex: "administrators",
          scopedSlots: { customRender: "administrators" },
        },
        {
          title: "初始化状态",
          dataIndex: "InitializationStatus",
          scopedSlots: { customRender: "InitializationStatus" },
        },
        {
          title: "初始化完成时间",
          dataIndex: "InitializationTime",
        },
        {
          title: "操作",
          key: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        totalCount: 500,
      },
      visible: false,
    };
  },
  methods: {
    onSearch() {},
    onReset() {
      this.keywords = "";
    },
    onAdd(e) {
      console.log(Pagination);
      e.stopPropagation();
      this.visible = true;
    },
    onShowSizeChange(current, size) {
      this.pageno = current;
      this.pagesize = size;
      // this.querysyJyz();
    },
  },
};
</script>
<style lang="scss" scoped>
.tenant-page {
  background: #ffffff;
  border-radius: 4px;
  height: calc(100% - var(--layout-header-height));
  padding: 20px 16px;
  &-search-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 400;
    .input {
      width: 240px;
      height: 32px;
      background: #ffffff;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      color: rgba(0, 0, 0, 0.25);
      float: left;
    }
    .search_btn {
      float: left;
      width: 72px;
      border-radius: 2px;
    }
    .search {
      background: #2e83ff;
      margin: 0 32px;
      border: 0;
      color: #ffffff;
    }
    .reset {
      color: rgba(0, 0, 0, 0.65);
    }
    &-r {
      width: 88px;
      height: 32px;
      background: #2e83ff;
      border-radius: 2px;
      color: #ffffff;
      padding: 0;
    }
  }
  &-table-box {
    .logo {
      width: 60px;
      height: 60px;
      background: #d8d8d8;
      border-radius: 8px;
      color: rgba(0, 0, 0, 0.85);
      text-align: center;
      line-height: 60px;
    }
    .detail {
      color: #0072f5;
      cursor: pointer;
    }
    .editor {
      color: #2e83ff;
      cursor: pointer;
    }
  }
}
.ant-pagination {
  display: none;
}
</style>
