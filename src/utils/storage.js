export const KEY_PREFIX = "PROJECT_H_LINK_";

const getStorage = (isSession = true) => (isSession ? sessionStorage : localStorage);

export default {
  get(keys, isSession) {
    const result = [{}, keys].flat().reduce((target, key) => ({
      ...target,
      [key]: getStorage(isSession).getItem(`${KEY_PREFIX}${key.toUpperCase()}`),
    }));
    return Array.isArray(keys) ? result : result[keys];
  },

  set(key, value, isSession) {
    return getStorage(isSession).setItem(`${KEY_PREFIX}${key.toUpperCase()}`, value);
  },

  clear(isSession) {
    getStorage(isSession).clear();
  },

  remove(keys, isSession) {
    (typeof keys === "string" ? [keys] : keys).forEach((key) =>
      getStorage(isSession).removeItem(
        key.startsWith(KEY_PREFIX) ? key : `${KEY_PREFIX}${key.toUpperCase()}`
      )
    );
  },

  removeAll(isSession) {
    this.remove(Object.keys(getStorage(isSession)).filter((it) => it.startsWith(KEY_PREFIX)));
  },
};
