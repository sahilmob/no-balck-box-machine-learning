const getPathCount = (paths) => {
  return paths.length;
};

const getPointCount = (paths) => {
  const points = paths.flat();
  return points.length;
};

export { getPathCount, getPointCount };
