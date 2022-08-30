<template>
  <div class="log-page">
    <log-form @search="onSearch" />
    <a-table
      ref="table"
      row-key="id"
      :scroll="scroll"
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      @change="onTableChange"
    >
      <template #action="id">
        <a @click="onView(id)"> 查看修改详情 </a>
      </template>
    </a-table>
    <log-modal :show.sync="visible" :data="current" />
  </div>
</template>

<script>
import { OperateMixin, TableMixin } from "@/mixins";
import { getOperateRecordById, getOperateRecordPage } from "@/api/log";
import LogForm from "./form.vue";
import LogModal from "./modal.vue";
import { columns } from "./about";

export default {
  name: "Log",
  components: { LogForm, LogModal },
  mixins: [TableMixin, OperateMixin(getOperateRecordPage)],
  data() {
    return { columns, current: {}, visible: false };
  },
  methods: {
    async onView(id) {
      this.current = await getOperateRecordById(id);
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-table-wrapper {
  margin-top: 20px;
  height: calc(100% - 60px);
}
</style>
