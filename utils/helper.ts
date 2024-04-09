export const splitDateString = (date: string | undefined) => {
  if (!date) {
    return null;
  }

  return date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6);
};

export const dateToDateString = (date: Date) => {
  return date.toISOString().slice(0, 10).replace(/-/g, '');
};

export const shuffle = (array: any[]) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
};
