<template>
  <div class="login-page">
    <div class="login-page-box">
      <img class="login-page-box_img" src="@/assets/images/login-left.png" alt="login-left" />
      <div class="login-page-box_form">
        <h3>
          <img src="@/assets/images/logo.png" alt="Logo" />
          <span>叨叨管理</span>
        </h3>
        <a-form-model>
          <a-form-model-item>
            <a-input v-model="form.email" placeholder="输入邮箱账号" @pressEnter="onLogin" />
          </a-form-model-item>
          <a-form-model-item>
            <a-input-search
              v-model="form.captcha"
              placeholder="验证码"
              @pressEnter="onLogin"
              @search="onGetCode"
            >
              <a-button slot="enterButton" class="get-code" :disabled="!!countdown"
                >获取验证码
                <template v-if="countdown">({{ countdown }}s)</template>
              </a-button>
            </a-input-search>
          </a-form-model-item>
          <a-button
            type="primary"
            class="login-btn"
            :disabled="!form.email || !form.captcha"
            @click="onLogin"
            >登陆</a-button
          >
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchLogin, getAnonymousAuth, sendEmailCaptcha } from "@/api/login";

import { ACCESS_IS_LOGIN, ACCESS_IV_KEY, ACCESS_SECRET_KEY, ACCESS_TOKEN } from "@/common/constant";

import { isEmail } from "@/utils/verify";

import { CHANGE_USER_INFO } from "@/store/mutations-types";

export default {
  name: "Login",
  data() {
    return {
      countdown: 0,
      form: { email: "", captcha: "", pkId: "" },
    };
  },
  created() {
    this.onInit();
  },
  methods: {
    doSaveToStorage({ iv, secretKey, token }) {
      this.$storage.set(ACCESS_IV_KEY, iv);
      this.$storage.set(ACCESS_TOKEN, token);
      this.$storage.set(ACCESS_SECRET_KEY, secretKey);
    },
    async onInit() {
      const requestid = Math.random().toString().slice(2, 6);
      const data = await getAnonymousAuth(requestid);
      this.doSaveToStorage(data);
    },
    async onLogin() {
      const data = await fetchLogin(this.form);
      this.$store.commit(`user/${CHANGE_USER_INFO}`, data);
      this.$storage.set(ACCESS_IS_LOGIN, "1");
      this.doSaveToStorage(data);
      this.$router.replace("/");
    },
    onBackward() {
      this.countdown -= 1;
      this.countdown > 0 && setTimeout(() => this.onBackward(), 1000);
    },
    async onGetCode() {
      if (!this.form.email) return this.$message.warning("请先输入邮箱地址");
      if (!isEmail(this.form.email)) return this.$message.warning("请输入正确的邮箱地址");
      ({ pkId: this.form.pkId } = await sendEmailCaptcha(this.form.email));
      this.countdown = 60;
      this.onBackward();
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("~@/assets/images/login-bg.png") no-repeat center/100% 100%;

  &-box {
    width: 934px;
    height: 512px;
    display: flex;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0px 19px 43px 0px rgba(0, 0, 0, 0.19);

    &_img {
      width: 436px;
      height: 263px;
      margin: 125px 45px 124px 50px;
    }

    &_form {
      width: 320px;

      h3 {
        height: 40px;
        display: flex;
        margin: 70px 0;
        align-items: center;
        justify-content: center;

        img {
          width: 40px;
          height: 40px;
        }

        span {
          font-weight: 600;
          color: #000000;
          margin-left: 12px;
          font-size: var(--font-size-xxxxl);
        }
      }

      ::v-deep(.ant-input) {
        height: 40px;
      }

      .get-code {
        padding: 0;
        height: 40px;
        width: 110px;
        font-size: var(--font-size-m);

        &:disabled {
          color: #d90514;
          background: #fbe6e7;
        }
      }

      .login-btn {
        width: 100%;
        height: 40px;
        margin-top: 40px;
      }
    }
  }
}
</style>
