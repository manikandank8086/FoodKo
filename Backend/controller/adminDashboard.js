import OrderModel from "../../Backend/model/orderModel.js";

const addOrder = async (req, res) => {
  try {
    const { customer, product, price, quantity, date, location, status } =
      req.body;
    console.log(customer);

    function generateRandomId() {
      const randomID = Math.floor(100000 + Math.random() * 900000).toString();
      console.log("Random ID: " + randomID);
      return randomID;
    }

    const addOrder = await OrderModel.create({
      orderId: generateRandomId(),
      customerName: customer,
      item: product,
      price: price,
      quantity: quantity,
      orderDate: date,
      location: location,
      status: status,
    });

    if (addOrder) {
      return res
        .status(200)
        .json({ success: true, message: "Order added success" });
    }
    return res
      .status(401)
      .json({ success: false, message: "order adding failed" });
  } catch (error) {
    console.log("err" + error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderModel.find();
    console.log(orderDetails);

    if (orderDetails) {
      const totalOrders = await OrderModel.countDocuments();
      console.log(totalOrders);

      const totalDeliveredCount = await OrderModel.find({
        status: "Delivered",
      }).countDocuments();

      const totalCancelledCount = await OrderModel.find({
        status: "Cancelled",
      }).countDocuments();

      const totalRevenue = await OrderModel.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } },
          },
        },
      ]);

      const totalRevenueAmount =
        totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;

      return res.status(200).json({
        success: true,
        data: {
          orderDetails,
          totalOrders,
          totalDeliveredCount,
          totalCancelledCount,
          totalRevenue: totalRevenueAmount,
        },
        message: "Data retrieved successfully",
      });
    }

    return res
      .status(401)
      .json({ success: false, message: "Cannot retrieve data" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateOrderData = async (req, res) => {
  try {
    console.log("working controlerr");
    const id = req.params.id;
    console.log(id);
    const {
      orderId,
      customer,
      product,
      price,
      quantity,
      date,
      location,
      status,
    } = req.body;
    if (id) {
      const updateOrderData = await OrderModel.updateOne(
        {
          orderId: id,
        },
        {
          $set: {
            orderId: orderId,
            customerName: customer,
            item: product,
            price: price,
            quantity: quantity,
            orderDate: date,
            location: location,
            status: status,
          },
        }
      );

      if (updateOrderData) {
        console.log("success");
        return res
          .status(200)
          .json({ success: true, message: "update success" });
      }
    }
    return res.status(401).json({ success: false, message: "Updation Failed" });
  } catch (error) {
    console.log("eerr" + error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    console.log("working controller");
    const orderId = req.params.orderId;

    if (orderId) {
      const deleteOrder = await OrderModel.deleteOne({ orderId: orderId });
      if (deleteOrder) {
        return res
          .status(200)
          .json({ success: true, message: "Deletion success" });
      }
    }
    return res
      .status(409)
      .json({ success: false, message: "Cannot find Order Id" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { addOrder, getOrderDetails, updateOrderData, deleteOrder };
