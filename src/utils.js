const printProgress = (count, max) => {
  const percentage = Math.floor((count / max) * 100);
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Processing: ${percentage}%`);
};

export { printProgress };
