import createError from 'http-errors';
import isValidUniqueObjectIds from './isValidUniqueObjectIds.mjs';
import areDbIdsEqual from './areDbIdsEqual.mjs';

export default (arr, input) => {
  if (!isValidUniqueObjectIds(input)) {
    throw createError(400);
  }
  const len = arr.length;
  if (len !== input.length) {
    throw createError(400);
  }
  const updates = [];
  for (let i = 0; i < len; i++) {
    const target = input[i];
    if (!arr.some((d) => areDbIdsEqual(d._id, target))) {
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
