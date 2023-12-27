import test from 'ava'; // eslint-disable-line
import getQuery from '../src/getQuery.mjs';

test('getQuery', (t) => {
  t.deepEqual(getQuery(), {
  });
  t.deepEqual(getQuery({ name: 'aa' }), {
    name: 'aa',
  });
  t.deepEqual(getQuery({ name: null }), {
  });
  t.deepEqual(getQuery({
    timeCreateStart: 20,
  }), {
    timeCreate: {
      $gte: 20,
    },
  });
  t.deepEqual(getQuery({
    timeCreateEnd: 200,
  }), {
    timeCreate: {
      $lte: 200,
    },
  });
  t.deepEqual(getQuery({
    timeCreateStart: 20,
    timeCreateEnd: 200,
  }), {
    timeCreate: {
      $gte: 20,
      $lte: 200,
    },
  });
  t.deepEqual(getQuery({
    timeUpdateStart: 20,
  }, 'timeUpdate'), {
    timeUpdate: {
      $gte: 20,
    },
  });
  t.deepEqual(getQuery({
    timeUpdateEnd: 200,
  }, 'timeUpdate'), {
    timeUpdate: {
      $lte: 200,
    },
  });
  t.deepEqual(getQuery({
    timeUpdateStart: 20,
    timeUpdateEnd: 200,
  }, 'timeUpdate'), {
    timeUpdate: {
      $gte: 20,
      $lte: 200,
    },
  });
  t.deepEqual(getQuery({
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
