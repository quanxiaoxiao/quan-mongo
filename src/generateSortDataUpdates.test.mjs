import test from 'node:test'; // eslint-disable-line
import assert from 'node:assert';
import mongoose from 'mongoose';
import generateSortDataUpdates from './generateSortDataUpdates.mjs';

const getId = () => (new mongoose.Types.ObjectId()).toString();

test('generateSortDataUpdates', () => {
  assert.deepEqual(generateSortDataUpdates([], []), []);
  assert.throws(() => {
    assert.deepEqual(generateSortDataUpdates([], [getId()]), []);
  });
  assert.throws(() => {
    assert.deepEqual(generateSortDataUpdates(['123'], ['123']), []);
  });
  const _ids = [getId(), getId(), getId()];
  const len = _ids.length;
  assert.deepEqual(
    generateSortDataUpdates(_ids.map((_id) => ({
      _id,
    })), _ids),
    _ids.map((_id, i) => ({
      updateOne: {
        filter: {
          _id,
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
    })),
  );

  assert.throws(() => {
    generateSortDataUpdates(_ids.map((_id) => ({
      _id,
    })), _ids.slice(1));
  });
  assert.throws(() => {
    generateSortDataUpdates(_ids.map((_id) => ({
      _id,
    })).slice(1), _ids);
  });
  assert.throws(() => {
    const __ids = _ids.map((_id, i) => (i === 1 ? `${_id}1` : _id));
    generateSortDataUpdates(__ids.map((_id) => ({
      _id,
    })), __ids);
  });
  assert.throws(() => {
    const __ids = _ids.map((_id, i) => (i === 1 ? `${_id.slice(12)}${_id.slice(0, 12)}` : _id));
    generateSortDataUpdates(__ids.map((_id) => ({
      _id,
    })), _ids);
  });
  assert.throws(() => {
    const __ids = _ids.map((_id, i) => (i === 1 ? `${_id.slice(12)}${_id.slice(0, 12)}` : _id));
    generateSortDataUpdates(_ids.map((_id) => ({
      _id,
    })), __ids);
  });
});
