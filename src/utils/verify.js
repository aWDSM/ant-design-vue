// 布尔值
export const isBoolean = (val) => typeof val === "boolean";

// 空判断
export const isEmpty = (val) => val == null || !(Object.keys(val) || val).length;

// 函数判断
export const isFunction = (val) => typeof val === "function";

// undefined && null 判断
export const isNil = (val) => val === undefined || val === null;

// 数字校验
export const isNumber = (val) => typeof val === "number";

// 对象校验
export const isObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]";

// 数组校验
export const isArray = (val) => Object.prototype.toString.call(val) === "[object Array]";

// 字符串校验
export const isString = (val) => typeof val === "string";

// Symbol校验
export const isSymbol = (val) => typeof val === "symbol";

// Email 校验
export const isEmail = (val) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val
  );

// URL 校验
export const isURL = (val) =>
  /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(
    val
  );

// 小写校验
export const isLowerCase = (val) => /^[a-z]+$/.test(val);

// 大写校验
export const isUpperCase = (val) => /^[A-Z]+$/.test(val);

// 英文字母校验
export const isAlphabets = (val) => /^[A-Za-z]+$/.test(val);
