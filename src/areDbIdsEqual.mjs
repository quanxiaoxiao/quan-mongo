export default (obj1, obj2) => {
  if (typeof obj1.equals === 'function') {
    return obj1.equals(obj2);
  }
  return obj1 === obj2;
};
