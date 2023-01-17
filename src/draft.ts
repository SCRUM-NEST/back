let orderId;
if (this.orders.length) {
   orderId = this.orders[this.orders.length - 1].orderId + 1;
} else {
   orderId = 1;
}