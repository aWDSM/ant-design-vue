<template>
  <div class="tenant-detail-page">
    <a-breadcrumb>
      <a-breadcrumb-item href @click.native="$router.push({ name: 'Tenant' })"
        >租户管理
      </a-breadcrumb-item>
      <a-breadcrumb-item>租户详情</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="default-wrapper">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="基础信息">
          <tenant-detail-basic :data="result" @refresh="onLoad" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="功能管理">
          <tenant-detail-manage
            :id="result.id"
            :list="result.portalManageModuleList"
            @refresh="onLoad"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { getPortalById } from "@/api/tenant";
import TenantDetailBasic from "./basic.vue";
import TenantDetailManage from "./manage.vue";

export default {
  name: "TenantDetai",
  components: { TenantDetailBasic, TenantDetailManage },
  data() {
    return { result: {} };
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      this.result = await getPortalById(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tenant-detail-page {
  .default-wrapper {
    margin-top: 8px;
    height: calc(100% - 30px);

    .ant-tabs {
      height: 100%;

      ::v-deep(.ant-tabs-content) {
        height: calc(100% - 60px);
      }

      .ant-tabs-tabpane {
        overflow: auto;
      }
    }
  }
}
</style>
