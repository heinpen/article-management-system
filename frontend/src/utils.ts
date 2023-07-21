export const shortenString = (str: string, n: number) => {
  if (str.length <= n) {
    return str;
  } else {
    return str.slice(0, n - 3) + '...';
  }
};
