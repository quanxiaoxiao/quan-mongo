// @ts-expect-error
import createError from 'http-errors';
import isValidObjectId from './isValidObjectId.mjs';

/**
 * @typedef {Object} Item
 * @property {Object|string} _id
 */

/**
 * @param {Array<Item>} arr
 * @param {Array<string>} input
 * @returns {Array<Object>}
 */
export default (arr, input) => {
  const len = input.length;
  if (len !== input.length) {
    throw createError(400);
  }
  const updates = [];
  for (let i = 0; i < len; i++) {
    const target = input[i];
    if (!isValidObjectId(target)) {
      throw createError(400);
    }
    if (!arr.some((d) => d._id.toString() === target)) {
      throw createError(400);
    }
    updates.push({
      updateOne: {
        filter: {
          _id: target,
          invalid: {
            $ne: true,
          },
        },
        update: {
          $set: {
            order: len - i,
          },
        },
      },
    });
  }
  return updates;
};
