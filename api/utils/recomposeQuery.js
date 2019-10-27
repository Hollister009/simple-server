const multipleSearchQuery = (key, value) => {
  if (!value || !key) return {};

  const inValues = Array.isArray(value) ? value : value.split(',');

  return { [key]: { $in: inValues } };
}

const rangeQuery = (query) => {
  if (!query) return {};

  const range = JSON.parse(query);
  const { from, to } = range;

  return ({
    $and: [
      { price: { $gte: from } },
      { price: { $lte: to } }
    ]
  });
}

module.exports = {
  multipleSearchQuery,
  rangeQuery
}