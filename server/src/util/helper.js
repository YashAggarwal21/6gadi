exports.flatObjectToArray = (obj) => {
  let result = Object.entries(obj).reduce((accumulator, value) => {
    return accumulator.concat(value);
  });
  return result;
};
