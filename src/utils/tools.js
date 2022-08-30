/**
 * 防抖
 * @param {function} fn 回调函数
 * @param {number} delay 延迟时间
 * @returns {function}
 */
export const debounce = (fn, delay = 0) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

/**
 * 节流
 * @param {function} fn 回调函数
 * @param {number} delay 延迟时间
 * @returns {function}
 */
export const throttle = (fn, delay = 500) => {
  let lock;
  let timer;
  let time;

  return function (...args) {
    if (!lock) {
      lock = true;
      fn.apply(this, args);
      time = Date.now();
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (Date.now() - time >= delay) {
          fn.apply(this, args);
          time = Date.now();
        }
      }, Math.max(delay - (Date.now() - time), 0));
    }
  };
};

/**
 * 深拷贝
 * @param {Object|Array} obj 目标对象
 * @returns {Object|Array}
 */
export const deepClone = (obj) => {
  const clone = { ...obj };
  Object.keys(clone).forEach(
    (key) => (clone[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
};

// 函数通用柯理化
export const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

/**
 * 延迟函数
 * @param {number} ms 毫秒
 * @returns {Promise}
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 切个数组
 * @param {Array} arr 需要切割的数组
 * @param {Number} size 每个元素的长度
 * @returns {Array[Array[]]}
 */
export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
