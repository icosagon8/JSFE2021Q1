export const getKebabCaseString = (string: string): string => {
  return string.replace(/\s/g, '-').toLocaleLowerCase();
};
