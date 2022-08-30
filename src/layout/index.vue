<template>
  <div id="app-layout">
    <!-- menu section -->
    <div id="app-layout-menu">
      <header>
        <img src="@/assets/images/logo-m.png" alt="Logo" />
        <h3>叨叨管理</h3>
      </header>
      <ul id="app-layout-menu-list">
        <li
          v-for="(route, index) in routes"
          :key="`${route.name}_${index}`"
          :class="{ active: route.name === $route.name }"
          @click="$router.push(`/${route.path}`)"
        >
          <svg-icon v-if="route.meta.icon" class="menu-icon" :name="route.meta.icon" />
          <span v-if="route.meta.title">{{ route.meta.title }}</span>
        </li>
      </ul>
    </div>

    <!-- content on the right -->
    <div id="app-layout-content">
      <header>
        <a-avatar :size="24" icon="user" />
        <span class="name">花木兰</span>
        <span class="email">humulan@xxxx.com</span>
        <svg-icon name="logout" class="logout-icon" @click="visible = true" />
      </header>
      <router-view class="app-main"></router-view>
    </div>

    <!-- Logout dialog -->
    <a-modal
      v-model="visible"
      centered
      title="提示"
      ok-text="确定"
      cancel-text="取消"
      :mask-closable="false"
      @ok="onLogout"
    >
      确定退出登录？
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return { visible: false };
  },
  computed: {
    routes() {
      return this.$router.options.routes
        .find(({ name }) => name === "Layout")
        ?.children?.filter(({ meta }) => meta);
    },
  },
  methods: {
    onLogout() {},
  },
};
</script>

<style lang="scss" scoped>
#app-layout {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: var(--layout-background-color);

  &-menu {
    height: 100%;
    overflow: auto;
    width: var(--layout-menu-width);

    header {
      display: flex;
      padding-left: 16px;
      align-items: center;
      height: var(--layout-header-height);

      img {
        width: 28px;
        height: 28px;
        margin-right: 8px;
      }

      h3 {
        font-size: 14px;
        font-weight: bold;
        color: #000000;
      }
    }

    &-list {
      overflow-y: auto;
      height: calc(100% - var(--layout-header-height));

      li {
        width: 100%;
        height: 50px;
        display: flex;
        padding: 0 16px;
        cursor: pointer;
        align-items: center;
        transition: color 0.3s;
        color: rgba(0, 0, 0, 0.75);

        .menu-icon {
          width: 16px;
          height: 18px;
          margin-right: 7px;
        }

        span {
          font-size: 14px;
          font-weight: 500;
          font-family: var(--font-family-medium);
        }

        &.active {
          color: #316efb;
        }
      }
    }
  }

  &-content {
    height: 100%;
    width: calc(100% - var(--layout-menu-width));

    header {
      width: 100%;
      display: flex;
      align-items: center;
      padding-right: 20px;
      justify-content: flex-end;
      height: var(--layout-header-height);

      .name,
      .email {
        font-size: 12px;
        margin-left: 6px;
        line-height: 17px;
        color: #000000;
      }

      .logout-icon {
        width: 19px;
        cursor: pointer;
        margin-left: 12px;
        color: rgba(0, 0, 0, 0.44);
      }
    }

    .app-main {
      overflow: auto;
      border-radius: 4px;
      background: #fff;
      width: calc(100% - 16px);
      height: calc(100% - 20px - var(--layout-header-height));
    }
  }
}
</style>
