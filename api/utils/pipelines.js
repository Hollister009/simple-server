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

const getProductPipeline = (filter = {}, page = 0, limit = 20) => {
  const { colors } = filter;
  const imageLookup = getProductImagesPipeline(colors);
  const skipStage = { $skip: limit * page };
  const limitStage = limit ? { $limit: limit } : {};

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
    },
    skipStage,
    limitStage
  ];

  return pipeline;
}

module.exports = {
  getProductPipeline
};
