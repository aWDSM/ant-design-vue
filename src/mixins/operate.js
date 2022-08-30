import { isFunction } from "@/utils/verify";

/**
 * OperateMixin
 * @ Lyon Ren
 * Mixin For Table operate
 * 2022-08-21 10: 43
 */
export default (api) => ({
  data() {
    return { data: [], search: {} };
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      if (!isFunction(api)) return;
      const params = {
        ...this.search,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
      };
      ({ items: this.data, total: this.pagination.total } = await api(params));
    },
    onSearch(form) {
      this.pagination.current = 1;
      this.search = form;
      this.onLoad();
    },
    onTableChange(pagination) {
      this.pagination = { ...this.pagination, ...pagination };
      this.onLoad();
    },
  },
});
