import test from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import isValidObjectId from './isValidObjectId.mjs';

test('isValidObjectId', () => {
  assert(!isValidObjectId());
  assert(!isValidObjectId('aaa'));
  assert(isValidObjectId(new mongoose.Types.ObjectId()));
  assert(isValidObjectId((new mongoose.Types.ObjectId()).toString()));
  assert(!isValidObjectId(`${(new mongoose.Types.ObjectId()).toString()}a`));
});
