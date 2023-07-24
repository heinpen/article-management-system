export const shortenString = (str: string, n: number) => {
  if (str.length <= n) {
    return str;
  } else {
    return str.slice(0, n - 3) + '...';
  }
};

export const getBasePath = (path: string) => {
  const pathParts = path.split('/');
  console.log(`/${pathParts.slice(1, 3).join('/')}`);
  return `/${pathParts.slice(1, 3).join('/')}`;
};
