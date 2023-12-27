/**
 * @param {string|null|Object} str
 * @returns {boolean}
 */
export default (str) => {
  if (str == null) {
    return false;
  }
  if (typeof str === 'object') {
    return /^[0-9a-fA-F]{24}$/.test(str.toString());
  }
  return /^[0-9a-fA-F]{24}$/.test(str);
};
