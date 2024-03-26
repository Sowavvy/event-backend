const validateOrderID = (ordersList, ORDER_ID) => ordersList.includes(ORDER_ID) ? ordersList : [...ordersList, ORDER_ID];
  
export default validateOrderID;