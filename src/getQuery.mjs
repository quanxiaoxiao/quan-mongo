/**
 * @param {Object<String, *>} args
 * @param {string} dateTimeKey
 * @returns {Object<String, *>}
 */
export default (args = {}, dateTimeKey = 'timeCreate') => {
  /**
   * @type {Object<String, *>}
   */
  const query = {};
  const dateTimeStartKey = `${dateTimeKey}Start`;
  const dateTimeEndKey = `${dateTimeKey}End`;
  if (args[dateTimeStartKey] != null) {
    query[dateTimeKey] = {
      $gte: args[dateTimeStartKey],
    };
  }
  if (args[dateTimeEndKey] != null) {
    query[dateTimeKey] = {
      ...(query[dateTimeKey] || {}),
      $lte: args[dateTimeEndKey],
    };
  }
  return Object.keys(args).reduce((acc, dataKey) => {
    if ([dateTimeStartKey, dateTimeEndKey].includes(dataKey)) {
      return acc;
    }
    const v = args[dataKey];
    if (v == null) {
      return acc;
    }
    return {
      ...acc,
      [dataKey]: v,
    };
  }, query);
};
