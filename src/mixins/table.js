import { throttle } from "@/utils/tools";

/**
 * TableMixin
 * @ Lyon Ren
 * Mixin For Table
 * 2022-08-19 19: 24
 */
export default {
  data() {
    return {
      scroll: { y: 0 },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      },
    };
  },
  mounted() {
    if (this.$refs.table) {
      this.onReset();
      window.addEventListener("resize", this.onReset.bind(this));
      this.$once("hook:destroyed", () =>
        window.removeEventListener("resize", this.onReset.bind(this))
      );
    } else console.warn("[TableMixin]: There is no ref named table in $refs");
  },
  methods: {
    onReset: throttle(function () {
      try {
        const { $el } = this.$refs.table;
        const thead = $el.querySelector("thead")?.clientHeight || 0;
        this.scroll.y = $el.clientHeight - thead - 64;
      } catch (error) {
        console.error(`[TableMixin Error]: ${error.message}`);
      }
    }, 500),
  },
};
