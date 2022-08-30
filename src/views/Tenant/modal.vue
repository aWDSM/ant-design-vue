<template>
  <a-modal
    v-model="visible"
    centered
    destroy-on-close
    :width="800"
    :title="title"
    :mask-closable="false"
    v-bind="type === 2 && { footer: null }"
    :body-style="{ paddingBottom: type !== 2 ? '90px' : '62px' }"
    :confirm-loading="confirmLoading"
    @ok="onEnter"
  >
    <a-table
      v-if="type === 2"
      row-key="id"
      :scroll="{ y: 450 }"
      :pagination="false"
      :columns="initColumns"
      :data-source="data.items || []"
    >
      <template #status="state">
        <span v-if="state">
          <a-icon v-if="status[state]?.type" v-bind="{ spin: false, ...status[state] }" />
          {{ status[state]?.text || state }}
        </span>
      </template>
    </a-table>
    <a-form-model
      v-else
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{ span: 3, offset: 4 }"
      :wrapper-col="{ span: 8 }"
    >
      <a-form-model-item required label="租户名称:" prop="name">
        <a-textarea
          v-model="form.name"
          placeholder="请输入租户名称"
          :max-length="100"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
        <div class="textarea-count">{{ form.name.length }}/100</div>
      </a-form-model-item>
      <a-form-model-item
        required
        prop="logoPath"
        label="租户logo:"
        extra="图片仅支持jpg/jpeg/png格式，宽高尺寸为180x180px，大小不得超过20M"
        :wrapper-col="{ span: 15 }"
      >
        <a-upload
          action="#"
          name="file"
          accept=".jpeg,.png,.jpg"
          list-type="picture-card"
          :show-upload-list="false"
        >
          <img v-if="form.logoPath" :src="form.logoPath" alt="Logo" />
          <a-icon v-else type="plus" />
        </a-upload>
      </a-form-model-item>
    </a-form-model>
    <a-modal
      v-model="showConfirm"
      centered
      title="提示"
      :width="560"
      :mask-closable="false"
      @ok="onConfirm"
    >
      新建租户信息尚未提交，是否确定离开？
    </a-modal>
  </a-modal>
</template>

<script>
import { savePortal2BaseInfo } from "@/api/tenant";
import { initColumns, initStatusMap as status } from "./about";

export default {
  name: "TenantModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
      default: 0,
      require: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      status,
      initColumns,
      showConfirm: false,
      confirmLoading: false,
      form: { id: "", name: "", logoPath: "" },
      rules: {
        name: { required: true, message: "请填写租户名称" },
        logoPath: { required: true, message: "请上传租户Logo", trigger: "change" },
      },
    };
  },
  computed: {
    visible: {
      get() {
        return this.show;
      },
      set(state) {
        if (!state && state !== 0 && Object.values(this.form).some(Boolean))
          this.showConfirm = true;
        else {
          this.$emit("update:show", !!state);
          !state && Object.assign(this.$data, this.$options.data());
        }
      },
    },
    title() {
      return ["新建租户", "编辑基础信息", "初始化详情"][this.type];
    },
  },
  watch: {
    show: {
      handler(val) {
        val && this.type === 1 && (this.form = { ...this.form, ...this.data });
      },
      immediate: true,
    },
  },
  methods: {
    onConfirm() {
      this.visible = 0;
      this.showConfirm = false;
    },
    async onEnter() {
      try {
        this.confirmLoading = true;
        await this.$refs.form.validate();
        await savePortal2BaseInfo(this.form);
        this.$emit("refresh");
        this.visible = 0;
      } catch {
        this.confirmLoading = false;
        console.warn("valid error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea-count {
  position: absolute;
  top: 0;
  right: 12px;
  font-weight: 400;
  line-height: 20px;
  font-size: var(--font-size-m);
  color: rgba(0, 0, 0, 0.85);
}

.anticon-plus {
  font-size: 32px;
  color: rgba(0, 0, 0, 0.65);
}
</style>
