const printProgress = (count, max) => {
  const percentage = Math.floor((count / max) * 100);
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Processing: ${percentage}%`);
};

const groupBy = (array, key) => {
  return array.reduce((acc, obj) => {
    const property = obj[key];
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});
};

export { printProgress, groupBy };
