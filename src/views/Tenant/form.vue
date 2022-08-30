<template>
  <div class="tenant-form">
    <a-form-model ref="form" layout="inline" :model="form">
      <a-form-model-item prop="search">
        <a-input v-model="form.search" placeholder="输入租户名称" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="onSearch"> 查询 </a-button>
      </a-form-model-item>
      <a-form-model-item>
        <a-button @click="onReset"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-button type="primary" icon="plus" @click="onCreate"> 新建租户 </a-button>
  </div>
</template>

<script>
export default {
  name: "TenantForm",
  data() {
    return { form: { search: "" } };
  },
  methods: {
    onReset() {
      this.$refs.form.resetFields();
      this.$emit("search", this.form);
    },
    onSearch() {
      this.$emit("search", this.form);
    },
    onCreate() {
      this.$emit("create");
    },
  },
};
</script>

<style lang="scss" scoped>
.tenant-form {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .ant-form {
    .ant-input {
      width: 240px;
    }

    .ant-btn {
      width: 72px;
    }
  }
}
</style>
