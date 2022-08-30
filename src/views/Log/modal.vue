<template>
  <a-modal
    v-model="visible"
    centered
    destroy-on-close
    :width="width"
    :footer="null"
    :mask-closable="false"
    :title="data.recordContent"
    :body-style="{ paddingBottom: type === 2 ? '90px' : '124px' }"
  >
    <a-table
      v-if="type === 0"
      :scroll="{ y: 240 }"
      :columns="columns"
      :data-source="data"
      :pagination="false"
    />
    <ul v-else-if="type === 1">
      <li>
        <div class="title">租户名称:</div>
        <div class="value">新建租户的名称</div>
      </li>
      <li>
        <div class="title">租户logo:</div>
        <div class="value">
          <a-avatar class="logo" shape="square" :size="64">Logo</a-avatar>
        </div>
      </li>
    </ul>
    <ul v-else-if="type === 2">
      <li v-for="item in data.items" :key="item.key">
        <div class="title">{{ item.name }}</div>
        <div class="value">{{ item.afterVal }}</div>
      </li>
    </ul>
  </a-modal>
</template>

<script>
import { modalColumns as columns } from "./about";

export default {
  name: "LogModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return { columns };
  },
  computed: {
    visible: {
      get() {
        return this.show;
      },
      set(status) {
        this.$emit("update:show", status);
      },
    },
    type() {
      return this.data.recordType || 0;
    },
    width() {
      return this.type === 0 ? 640 : 560;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  li {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;

    &:last-child {
      margin-bottom: 0;
    }

    & > div {
      width: 50%;
      font-weight: 400;
      font-size: var(--font-size-l);
      font-family: var(--font-family-regular);
    }

    .title {
      text-align: right;
      padding-right: 20px;
      color: rgba(0, 0, 0, 0.85);
    }

    .value {
      color: rgba(0, 0, 0, 0.65);
    }

    .logo {
      background: rgba(0, 0, 0, 0.04);

      ::v-deep(.ant-avatar-string) {
        font-weight: bold;
        font-size: var(--font-size-l);
        color: rgba(0, 0, 0, 0.65);
        font-family: var(--font-family-regular);
      }
    }
  }
}
</style>
