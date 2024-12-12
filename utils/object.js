const addToObject = (obj, prop, newProps) => {
  if (obj[prop]) {
    obj[prop] = { ...obj[prop], ...newProps };
  } else {
    obj[prop] = newProps;
  }
};

module.exports = { addToObject };
