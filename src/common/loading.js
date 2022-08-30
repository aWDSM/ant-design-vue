import store from "@/store";
import { CHANGE_LOADING_STATUS } from "@/store/mutations-types";

export const isHideLoadingAry = [];

export const ControlLoading = () => {
  let size = 0;
  const cache = new Map();

  return [
    (url, cancel = () => {}, hideLoading = false) => {
      cache.has(url) && cache.get(url)();
      cache.set(url, cancel);
      !hideLoading && (size += 1);
      size && !store.state.view.loading && store.commit(`view/${CHANGE_LOADING_STATUS}`, true);
    },
    (url, hideLoading = false) => {
      cache.delete(url);
      !hideLoading && (size = Math.max(size - 1, 0));
      !size && setTimeout(() => !size && store.commit(`view/${CHANGE_LOADING_STATUS}`, false), 300);
    },
  ];
};
