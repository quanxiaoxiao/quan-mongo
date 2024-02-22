import assert from 'node:assert';
import test from 'node:test';
import mongoose from 'mongoose';
import isValidUniqueObjectIds from './isValidUniqueObjectIds.mjs';

const getId = () => new mongoose.Types.ObjectId();

test('isValidUniqueObjectIds', () => {
  assert.throws(() => {
    isValidUniqueObjectIds({});
  });
  assert(isValidUniqueObjectIds([]));
  assert(!isValidUniqueObjectIds(['asdfw']));
  assert(isValidUniqueObjectIds([getId(), getId()]));
  const _id = getId();
  assert(!isValidUniqueObjectIds([_id, _id]));
  assert(!isValidUniqueObjectIds([null]));
  assert(!isValidUniqueObjectIds([_id, `${_id}9`]));
});
