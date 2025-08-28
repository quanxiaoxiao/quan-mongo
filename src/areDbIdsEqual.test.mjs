import assert from 'node:assert';
import test from 'node:test';

import mongoose from 'mongoose';

import areDbIdsEqual from './areDbIdsEqual.mjs';

test('areDbIdsEqual', () => {
  assert(areDbIdsEqual('111', '111'));
  assert(!areDbIdsEqual('111', '112'));
  const obj1 = new mongoose.Types.ObjectId();
  assert(areDbIdsEqual(obj1, obj1.toString()));
  assert(!areDbIdsEqual(obj1, new mongoose.Types.ObjectId()));
});
