import assert from 'node:assert';
import isValidObjectId from './isValidObjectId.mjs';

export default (arr) => {
  assert(Array.isArray(arr));
  const data = {};
  for (let i = 0; i < arr.length; i++) {
    const _id = arr[i];
    if (!_id) {
      return false;
    }
    if (!isValidObjectId(_id)) {
      return false;
    }
    const key = typeof _id === 'string' ? _id : _id.toString();
    if (data[key]) {
      return false;
    }
    data[key] = true;
  }
  return true;
};
