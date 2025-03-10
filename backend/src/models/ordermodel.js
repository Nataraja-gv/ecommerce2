 const mongoose = require('mongoose');

 const OrderSchema = new mongoose.Schema({
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,   
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'canceled'],
      default: 'pending',
    },
    items: [{
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    }],
    totalPrice: {
      type: Number,
      required: true,
    },
  });


  const OrderList = mongoose.model('OrderList', OrderSchema);
  module.exports = OrderList;