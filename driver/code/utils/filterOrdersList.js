const filterOrdersList = (ordersList, ORDER_ID) => [...ordersList.filter(id => id !== ORDER_ID)];
  
export default filterOrdersList;