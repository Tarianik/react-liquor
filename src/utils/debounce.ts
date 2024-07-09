export const debounce = <Params extends any[]>(
  callback: (...args: Params) => void,
  delay: number
) => {
  let timerId: number;
  return (...args: Params) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(() => callback.apply(null, args), delay);
  };
};
