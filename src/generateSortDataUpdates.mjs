import createError from 'http-errors';

import areDbIdsEqual from './areDbIdsEqual.mjs';
import isValidUniqueObjectIds from './isValidUniqueObjectIds.mjs';

export default (arr, input) => {
  if (!isValidUniqueObjectIds(input)) {
    throw createError(400);
  }
  const len = arr.length;
  if (len !== input.length) {
    throw createError(400);
  }
  const arrIdSet = new Set(arr.map(item => item._id?.toString()));

  const invalidIds = input.filter((targetId) => {
    const targetIdStr = targetId?.toString();
    return !Array.from(arrIdSet).some((arrId) =>
      areDbIdsEqual(arrId, targetIdStr),
    );
  });

  if (invalidIds.length > 0) {
    throw createError(400, `IDs not found in original array: ${invalidIds.join(', ')}`);
  }

  const updates = input.map((targetId, index) => ({
    updateOne: {
      filter: {
        _id: targetId,
        invalid: { $ne: true },
      },
      update: {
        $set: {
          order: arr.length - index,
        },
      },
    },
  }));

  return updates;
};
