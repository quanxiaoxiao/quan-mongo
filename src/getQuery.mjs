export default (args = {}, dateTimeKey = 'timeCreate') => {
  const query = {};
  const dateTimeStartKey = `${dateTimeKey}Start`;
  const dateTimeEndKey = `${dateTimeKey}End`;
  const dateTimeStart = args[dateTimeStartKey];
  const dateTimeEnd = args[dateTimeEndKey];
  if (dateTimeStart != null || dateTimeEnd != null) {
    query[dateTimeKey] = {};
    if (dateTimeStart != null) {
      query[dateTimeKey].$gte = dateTimeStart;
    }
    if (dateTimeEnd != null) {
      query[dateTimeKey].$lte = dateTimeEnd;
    }
  }
  const excludeKeys = new Set([dateTimeStartKey, dateTimeEndKey]);

  Object.entries(args).forEach(([key, value]) => {
    if (!excludeKeys.has(key) && value != null) {
      query[key] = value;
    }
  });

  return query;
};
