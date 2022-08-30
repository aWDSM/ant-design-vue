<template>
  <div class="mz-antd-pagination">
    <a-pagination
      v-model="current"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-size-changer
      :page-size="pageSize"
      show-quick-jumper
      @showSizeChange="onShowSizeChange"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span>{{ props.value }}条/页</span>
      </template>
    </a-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSizeOptions: {
      type: Array,
      default() {
        return ["10", "20", "30", "40", "50"];
      },
    },
  },
  data() {
    return {
      pageSize: 10,
      current: 1,
    };
  },
  watch: {
    current(val) {
      this.$emit("onShowSizeChange", val, this.pageSize);
    },
  },
  mounted() {},
  methods: {
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.current = current;
      this.$emit("onShowSizeChange", current, pageSize);
    },
  },
};
</script>

<style lang="scss" scoped>
.mz-antd-pagination {
  .ant-pagination {
    text-align: right !important;
    margin-top: 20px !important;
  }
}
</style>
