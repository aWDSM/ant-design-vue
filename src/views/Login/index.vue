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
            <a-input v-model="form.name" placeholder="输入邮箱账号" />
          </a-form-model-item>
          <a-form-model-item>
            <a-input-search v-model="form.code" placeholder="验证码" @search="onSearch">
              <a-button slot="enterButton" class="get-code">获取验证码</a-button>
            </a-input-search>
          </a-form-model-item>
          <a-button
            type="primary"
            class="login-btn"
            :disabled="!form.name && !form.value"
            @click="onLogin"
          >
            登陆
          </a-button>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return { form: { name: "", code: "" } };
  },
  methods: {
    onSearch() {},
    onLogin() {},
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
          font-size: 24px;
          font-weight: 600;
          color: #000000;
          margin-left: 12px;
        }
      }

      ::v-deep(.ant-input) {
        height: 40px;
      }

      .get-code {
        height: 40px;
        font-size: 12px;
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
