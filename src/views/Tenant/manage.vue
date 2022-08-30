<template>
  <div class="tenant-detail-manage-page">
    <ul v-if="list.length">
      <li v-for="item in list" :key="item.id">
        <div class="desc">
          <h5>{{ item.moduleName }}</h5>
          <p>开启表示租户管理员可在Admin Center中配置该应用</p>
        </div>
        <div class="operate">
          <span>{{ item.moduleStatus ? "已开启" : "已关闭" }}</span>
          <a-switch
            :checked="!!item.moduleStatus"
            @change="(...args) => onChange(item.id, ...args)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { savePortalManageModule } from "@/api/tenant";

export default {
  name: "TenantDetailManage",
  props: {
    id: { type: String, default: "" },
    list: { type: Array, default: () => [] },
  },
  data() {
    return { flag: false };
  },
  methods: {
    async onChange(initProcessId, flag) {
      await savePortalManageModule({ id: this.id, initProcessId, switchVal: flag - 0 });
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
.tenant-detail-manage-page {
  padding: 0 82px;

  ul {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.15);

    li {
      display: flex;
      padding: 20px;
      line-height: 20px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      &:last-child {
        border-bottom: 0;
      }

      .desc {
        h5 {
          font-size: var(--font-size-l);
          color: rgba(0, 0, 0, 0.85);
        }

        p {
          font-size: var(--font-size-m);
          color: rgba(0, 0, 0, 0.45);
        }
      }

      .operate {
        span {
          margin-right: 8px;
          font-size: var(--font-size-l);
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
  }
}
</style>
