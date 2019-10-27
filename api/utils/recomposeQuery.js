const multipleSearchQuery = (key, value) => {
  if (!value || !key) return {};

  const inValues = Array.isArray(value) ? value : value.split(',');

  return { [key]: { $in: inValues } };
}

const rangeQuery = (query) => {
  if (!query) return {};
  let from, to;

  if (Array.isArray(query)) {
    [from, to] = query;
  } else {
    const range = JSON.parse(query);
    from = range.from;
    to = range.to;
  }

  return ({
    $and: [
      { price: { $gte: parseFloat(from) } },
      { price: { $lte: parseFloat(to) } }
    ]
  });
}

module.exports = {
  multipleSearchQuery,
  rangeQuery
}