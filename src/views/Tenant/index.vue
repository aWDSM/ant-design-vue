<template>
  <div class="tenant-page">
    <tenant-form @search="onSearch" @create="onCreate" />
    <a-table
      ref="table"
      row-key="id"
      :scroll="scroll"
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      @change="onTableChange"
    >
      <template #logo="src">
        <img v-error class="logo-image" alt="logo" :src="src" />
      </template>
      <template #status="state, { id }">
        {{ status[state]?.text || state }}
        <span v-if="state" class="table-view" @click="onView(id)"> 查看详情 </span>
      </template>
      <template #action="_, { id }">
        <a @click="$router.push(`/tenant/${id}`)"> 编辑 </a>
      </template>
    </a-table>
    <tenant-modal :show.sync="visible" :type="type" :data="result" @refresh="onLoad" />
  </div>
</template>

<script>
import { getPortalInitProcessList, getPortalPage } from "@/api/tenant";
import { OperateMixin, TableMixin } from "@/mixins";
import { columns, initStatusMap as status } from "./about";
import TenantForm from "./form.vue";
import TenantModal from "./modal.vue";

export default {
  name: "Tenant",
  components: { TenantForm, TenantModal },
  mixins: [TableMixin, OperateMixin(getPortalPage)],
  data() {
    return { status, columns, type: 0, result: {}, visible: false };
  },
  methods: {
    async onView(id) {
      this.result.items = await getPortalInitProcessList(id);
      this.type = 2;
      this.visible = true;
    },
    onCreate() {
      this.type = 0;
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-table-wrapper {
  margin-top: 20px;
  height: calc(100% - 60px);

  .table-view {
    font-size: var(--font-size-l);
    color: #0072f5;
    margin-left: 12px;
    cursor: pointer;
  }

  .logo-image {
    &.error-image {
      width: 60px;
    }
  }
}
</style>
