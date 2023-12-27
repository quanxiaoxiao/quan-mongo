import test from 'ava'; // eslint-disable-line
import mongoose from 'mongoose';
import generateSortDataUpdates from '../src/generateSortDataUpdates.mjs';

const getId = () => (new mongoose.Types.ObjectId()).toString();

test('1', (t) => {
  t.deepEqual(generateSortDataUpdates([], []), []);
  t.throws(() => {
    t.deepEqual(generateSortDataUpdates([], [getId()]), []);
  });
  t.throws(() => {
    t.deepEqual(generateSortDataUpdates(['123'], ['123']), []);
  });
  const _ids = [getId(), getId(), getId()];
  const len = _ids.length;
  t.deepEqual(
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

  t.throws(() => {
    generateSortDataUpdates(_ids.map((_id) => ({
      _id,
    })), _ids.slice(1));
  });
  t.throws(() => {
    generateSortDataUpdates(_ids.map((_id) => ({
      _id,
    })).slice(1), _ids);
  });
  t.throws(() => {
    const __ids = _ids.map((_id, i) => (i === 1 ? `${_id}1` : _id));
    generateSortDataUpdates(__ids.map((_id) => ({
      _id,
    })), __ids);
  });
  t.throws(() => {
    const __ids = _ids.map((_id, i) => (i === 1 ? `${_id.slice(12)}${_id.slice(0, 12)}` : _id));
    generateSortDataUpdates(__ids.map((_id) => ({
      _id,
    })), _ids);
  });
  t.throws(() => {
    const __ids = _ids.map((_id, i) => (i === 1 ? `${_id.slice(12)}${_id.slice(0, 12)}` : _id));
    generateSortDataUpdates(_ids.map((_id) => ({
      _id,
    })), __ids);
  });
});
