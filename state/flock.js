let flock = {
  faith: 5,
  resolve: 5,
  contentment: 5,
};
const setFlock = (newFlock) => {
  flock = { ...flock, ...newFlock };
};

export {
  flock,
  setFlock,
};
