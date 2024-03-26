const expandOrders = orders => new Object({
  acceptedOrders: orders.accepted,
  declinedOrders: orders.declined,
  completedOrders: orders.completed
});

export default expandOrders;