<template>
  <div class="tenant-detail-basic-page">
    <h5>租户信息</h5>
    <div class="info">
      <img v-error :src="data.logoPath" alt="Logo" />
      <div class="info-name">
        <p>{{ data.name }}</p>
        <div @click="onEdit"><a-icon type="edit" /><span>编辑</span></div>
      </div>
    </div>
    <h5>
      账号同步配置
      <a-icon :type="isShow ? 'eye' : 'eye-invisible'" @click="isShow = !isShow" />
    </h5>
    <div v-if="list.every(({ key }) => !data[key])" class="init-status">
      <div class="init-status__desc">
        <p class="init-status__desc_subtitle">
          <a-icon type="warning" theme="filled" />
          AAD账号同步凭证，一经保存成功，无法修改，请准确填写
        </p>
        <p class="init-status__desc_guide">
          <svg-icon name="ic_document" />
          <span>配置手册<a-icon type="right" /></span>
        </p>
      </div>
      <a-form-model ref="form" :model="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 8 }">
        <a-form-model-item
          v-for="item in list"
          :key="item.key"
          required
          :prop="item.key"
          :label="item.name"
          :rules="{ required: true, message: `请输入 ${item.name.slice(0, -1)}` }"
        >
          <a-input v-model="form[item.key]" placeholder="请输入"></a-input>
        </a-form-model-item>
        <a-button type="primary" @click="onSave"> 保存 </a-button>
      </a-form-model>
    </div>
    <ul v-else class="config">
      <li v-for="item in list" :key="item.key">
        <div class="title">{{ item.name }}</div>
        <div class="value">{{ isShow ? data[item.key] : data[item.key]?.replace(/./g, "*") }}</div>
      </li>
    </ul>
    <h5>租户管理员</h5>
    <div class="admin">
      <template v-if="data.adminEmailSettingStatus && data.aadSettingStatus">
        <div class="admin-email">{{ data.adminEmail }}</div>
        <div class="admin-email-desc">(初次设置的管理员)</div>
      </template>
      <template v-else>
        <p v-if="data.aadSettingStatus">AAD账号同步成功，请设置管理员</p>
        <p v-else>
          未同步到AAD账号，请在AAD添加账号后重试。
          <span @click="$emit('refresh')"
            ><a-icon type="sync" :rotate="45" />已添加，点击重新同步</span
          >
        </p>
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-select
              v-model="userId"
              show-search
              :filter-option="null"
              :not-found-content="null"
              :default-active-first-option="false"
              placeholder="input search text"
              @focus="onSearch"
              @search="onSearch"
            >
              <a-icon slot="suffixIcon" type="search" />
              <a-select-option v-for="item in option" :key="item.id" :value="item.id">
                {{ item.email }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="onSetAdmin"> 确定 </a-button>
          </a-form-model-item>
        </a-form-model>
      </template>
      <tenant-modal :show.sync="visible" :type="1" :data="result" @refresh="$emit('refresh')" />
    </div>
  </div>
</template>

<script>
import { getPortalUserList, savePortal2AADSetting, savePortal2AdminEmail } from "@/api/tenant";
import { throttle } from "@/utils/tools";
import TenantModal from "./modal.vue";
import { basicConfigList as list } from "./about";

export default {
  name: "TenantDetailBasic",
  components: { TenantModal },
  props: { data: { type: Object, default: () => ({}) } },
  data() {
    return {
      list,
      option: [],
      result: {},
      userId: "",
      isShow: false,
      visible: false,
      form: { tenantId: "", clientId: "", clientSecret: "", objectId: "" },
    };
  },
  methods: {
    onEdit() {
      const { id, name, logoPath } = this.data;
      this.result = { id, name, logoPath };
      this.visible = true;
    },
    async onSave() {
      try {
        await this.$refs.form.validate();
        await savePortal2AADSetting({ ...this.$route.params, ...this.form });
        this.$emit("refresh");
      } catch {
        console.warn("valid error");
      }
    },
    onSearch: throttle(async function (search) {
      this.option = await getPortalUserList({ id: this.data.id, search });
    }, 500),
    async onSetAdmin() {
      await savePortal2AdminEmail({ id: this.data.id, userId: this.userId });
    },
  },
};
</script>

<style lang="scss" scoped>
.tenant-detail-basic-page {
  padding: 10px 8px;

  h5 {
    font-weight: 500;
    margin-top: 24px;
    margin-bottom: 16px;
    color: #272727;
    font-size: var(--font-size-l);
    font-family: var(--font-family-medium);

    &::before {
      content: "";
      width: 4px;
      height: 16px;
      margin-right: 8px;
      border-radius: 2px;
      vertical-align: sub;
      display: inline-block;
      background: #2e83ff;
    }

    &:first-child {
      margin-top: 0;
    }

    .anticon-eye,
    .anticon-eye-invisible {
      cursor: pointer;
      margin-left: 24px;
      vertical-align: middle;
      font-size: var(--font-size-xxl);
    }
  }

  .info {
    display: flex;
    padding-left: 8px;

    img {
      width: 60px;
      height: 60px;
      margin-right: 16px;
    }

    .info-name {
      display: flex;
      padding-top: 14px;
      flex-direction: column;
      justify-content: space-between;

      & > p {
        font-size: var(--font-size-l);
        color: rgba(0, 0, 0, 0.85);
      }

      & > div {
        cursor: pointer;

        .anticon-edit {
          color: #2e83ff;
          margin-right: 5px;
        }
        & > span {
          font-size: var(--font-size-m);
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }
  }

  .config {
    padding-left: 8px;

    li {
      display: flex;
      margin-bottom: 24px;

      div {
        font-size: var(--font-size-l);

        &.title {
          width: 120px;
          text-align: right;
          color: rgba(0, 0, 0, 0.85);
        }

        &.value {
          width: calc(100% - 120px);
          padding-left: 20px;
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }
  }

  .init-status {
    padding-left: 8px;

    &__desc {
      display: flex;
      margin-bottom: 16px;
      align-items: center;

      &_subtitle {
        color: #d90514;
        margin-right: 54px;
        font-size: var(--font-size-l);

        .anticon-warning {
          margin-right: 10px;
        }
      }

      &_guide {
        .scoped-svg-icon {
          width: 14px;
          height: 14px;
          color: #969799;
        }

        & > span {
          cursor: pointer;
          margin-left: 6px;
          color: #0072f5;
          font-size: var(--font-size-l);
        }
      }
    }

    .ant-btn {
      width: 80px;
      margin-left: 462px;
    }

    ::v-deep(.ant-form-item-label) {
      width: 120px;

      label {
        color: rgba(0, 0, 0, 0.85);
      }
    }

    ::v-deep(.ant-form-item-control-wrapper) {
      width: 420px;
    }
  }

  .admin {
    padding-left: 8px;

    p {
      margin-bottom: 16px;
      font-size: var(--font-size-l);
      color: rgba(0, 0, 0, 0.55);

      span {
        cursor: pointer;
        margin-left: 48px;
        color: #0072f5;
        font-size: var(--font-size-l);

        .anticon-sync {
          margin-right: 8px;
        }
      }
    }

    .ant-btn {
      margin-left: 8px;
    }

    .ant-select {
      width: 454px;

      .anticon-search {
        color: #969799;
        font-size: var(--font-size-xl);

        ::v-deep(svg) {
          transform: none !important;
        }
      }
    }

    .admin-email {
      height: 20px;
      line-height: 20px;
      margin-bottom: 4px;
      font-size: var(--font-size-l);
      color: rgba(0, 0, 0, 0.85);
    }

    .admin-email-desc {
      line-height: 20px;
      font-size: var(--font-size-m);
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
