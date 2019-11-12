const getProductImagesPipeline = (colors) => {
  if (colors) {
    return (
      [
        {
          $lookup: {
            from: 'images',
            let: { id: "$_id" },
            pipeline: [
              {
                $match: {
                  productColor: colors,
                  $expr: { $eq: ["$productId", "$$id"] }
                }
              }
            ],
            as: 'images'
          }
        }
      ]
    );
  }

  return (
    [
      {
        $lookup: {
          from: 'images',
          localField: '_id',
          foreignField: 'productId',
          as: 'images'
        }
      }
    ]
  );
};

const getProductFilterPipeline = (filter = {}) => {
  const { colors } = filter;
  const imageLookup = getProductImagesPipeline(colors);

  const pipeline = [
    { $match: filter },
    ...imageLookup,
    {
      $lookup: {
        from: 'brands',
        localField: 'brandId',
        foreignField: '_id',
        as: 'brand'
      }
    }
  ];

  return pipeline;
}

const getPaginationPipeline = (page = 0, limit = 20) => {
  const skipStage = { $skip: limit * page };
  const limitStage = { $limit: limit };

  const pipeline = [
    skipStage,
    limitStage
  ];

  return pipeline;
}

module.exports = {
  getProductFilterPipeline,
  getPaginationPipeline
};
