<template>
  <a-config-provider :locale="locale">
    <a-spin id="root-spin" :spinning="loading">
      <a-icon slot="indicator" type="loading" spin />
      <router-view class="app-wrapper" />
    </a-spin>
  </a-config-provider>
</template>

<script>
import { mapState } from "vuex";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "App",
  data() {
    return { locale: zhCN };
  },
  computed: mapState("view", ["loading"]),
};
</script>

<style lang="scss" scoped>
#root-spin {
  width: 100%;
  height: 100%;

  ::v-deep(.ant-spin) {
    max-height: unset;

    .anticon-loading {
      top: 45%;
      font-size: 38px;
      color: rgba(0, 0, 0, 0.65);
    }
  }

  ::v-deep(.ant-spin-container) {
    width: 100%;
    height: 100%;

    .app-wrapper {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
