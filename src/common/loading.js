export const isHideLoadingAry = [];

export const ControlLoading = () => {
  let count = 0;
  return [
    () => {
      count += 1;
    },
    () => {
      count = Math.max(count - 1, 0);
    },
  ];
};
