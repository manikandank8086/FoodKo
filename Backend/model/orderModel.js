import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,  
  },
  customerName: {
    type: String,
    required: true,
  },
  item :{
    type:String,
    required :true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, 
  },
  price: {
    type: Number,
    required: true,
    min: 0, 
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Delivered','Cancell'],
    default: 'Pending', 
  },
  orderDate: {
    type: Date,
    require: true
  },
}, {
  timestamps: true, 
});


const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
