const getOrders = (data) => {
  const { results, ...meta } = data;
  const products = results.map((i) => {
    const { user, address, amount, quantity, status, _id } = i.toObject();
    return {
      user: {
        name: user.name,
        _id: user._id,
      },
      _id,
      address,
      amount,
      quantity,
      status,
    };
  });

  return {
    results: products,
    ...meta,
  };
};

module.exports = {
  getOrders,
};
