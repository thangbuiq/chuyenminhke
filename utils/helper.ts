export const splitDateString = (date: string | undefined) => {
  if (!date) {
    return null;
  }

  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
};

export const dateToDateString = (date: Date) => {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
};

export const shuffle = (array: any[]) => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};
