export const getKebabCaseString = (string: string): string => {
  return string.replace(/\s/g, '-').toLocaleLowerCase();
};

export const shuffleArray = <T>(array: T[]): T[] => {
  let j;
  let temp;
  const arr = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
};
