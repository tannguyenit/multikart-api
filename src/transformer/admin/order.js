const getOrders = (data) => {
  const { results, ...meta } = data;
  const products = results.map((i) => {
    const { user, address, amount, quantity, status, _id } = i.toObject();
    return {
      user: {
        name: user.name || null,
        _id: user._id || null,
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
