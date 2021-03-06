const { Types } = require('mongoose');

const wrapInId = (value) => {
  if (Array.isArray(value)) {
    const test = value.map(item => Types.ObjectId(item));

    return test;
  }

  return Types.ObjectId(value);
}

const multipleSearchQuery = (key, value, isId) => {
  if (!value || !key) return {};

  const inArray = Array.isArray(value) ? value : value.split(',');
  const inValues = isId ? wrapInId(inArray) : inArray;


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