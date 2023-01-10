const getOrders = (data) => {
  const { results, ...meta } = data;
  const products = results.map((i) => {
    const { user, customerNote, address, amount, quantity, status, _id } = i.toObject();
    return {
      _id,
      user: {
        name: user?.name || null,
        _id: user?._id || null,
      },
      customerNote,
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
