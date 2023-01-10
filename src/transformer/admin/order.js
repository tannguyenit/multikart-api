const getOrders = (data) => {
  const { results, ...meta } = data;
  console.log(results);
  const products = results.map((i) => {
    const { user, customerNote, address, amount, quantity, status, _id, createdAt, updatedAt } = i.toObject();
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
      createdAt,
      updatedAt,
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
