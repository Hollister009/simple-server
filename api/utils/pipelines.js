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

const getProductPipeline = (filter = {}) => {
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

module.exports = {
  getProductPipeline
};
