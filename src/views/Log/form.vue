<template>
  <a-form-model ref="form" layout="inline" :model="form">
    <a-form-model-item prop="userName">
      <a-input v-model="form.userName" placeholder="输入操作人姓名" />
    </a-form-model-item>
    <a-form-model-item prop="recordContent">
      <a-select v-model="form.recordContent" placeholder="操作描述">
        <a-icon slot="suffixIcon" type="caret-down" theme="filled" />
      </a-select>
    </a-form-model-item>
    <a-form-model-item prop="tenantName">
      <a-input v-model="form.tenantName" placeholder="输入租户名称" />
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" @click="onSearch"> 查询 </a-button>
    </a-form-model-item>
    <a-form-model-item>
      <a-button @click="onReset"> 重置 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: "LogForm",
  data() {
    return { form: { userName: "", tenantName: "", recordContent: void 0 } };
  },
  methods: {
    onReset() {
      this.$refs.form.resetFields();
      this.$emit("search", this.form);
    },
    onSearch() {
      this.$emit("search", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-input,
.ant-select {
  width: 160px;
}
</style>
