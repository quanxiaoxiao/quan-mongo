import test from 'node:test';
import assert from 'node:assert';
import getQuery from './getQuery.mjs';

test('getQuery', () => {
  assert.deepEqual(getQuery(), {
  });
  assert.deepEqual(getQuery({ name: 'aa' }), {
    name: 'aa',
  });
  assert.deepEqual(getQuery({ name: null }), {
  });
  assert.deepEqual(getQuery({
    timeCreateStart: 20,
  }), {
    timeCreate: {
      $gte: 20,
    },
  });
  assert.deepEqual(getQuery({
    timeCreateEnd: 200,
  }), {
    timeCreate: {
      $lte: 200,
    },
  });
  assert.deepEqual(getQuery({
    timeCreateStart: 20,
    timeCreateEnd: 200,
  }), {
    timeCreate: {
      $gte: 20,
      $lte: 200,
    },
  });
  assert.deepEqual(getQuery({
    timeUpdateStart: 20,
  }, 'timeUpdate'), {
    timeUpdate: {
      $gte: 20,
    },
  });
  assert.deepEqual(getQuery({
    timeUpdateEnd: 200,
  }, 'timeUpdate'), {
    timeUpdate: {
      $lte: 200,
    },
  });
  assert.deepEqual(getQuery({
    timeUpdateStart: 20,
    timeUpdateEnd: 200,
  }, 'timeUpdate'), {
    timeUpdate: {
      $gte: 20,
      $lte: 200,
    },
  });
  assert.deepEqual(getQuery({
    timeCreateStart: 30,
    timeUpdateStart: 20,
    timeUpdateEnd: 200,
  }, 'timeUpdate'), {
    timeCreateStart: 30,
    timeUpdate: {
      $gte: 20,
      $lte: 200,
    },
  });
});
