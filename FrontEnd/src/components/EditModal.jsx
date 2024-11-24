import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { editOrderDetailsValidation } from "../utils/Validation";

const Modal = ({ order, onClose, onSave }) => {
  const formik = useFormik({
    initialValues: {
      orderId: order.orderId,
      customer: order.customerName,
      product: order.item,
      price: order.price,
      quantity: order.quantity,
      location: order.location,
      status: order.status || "",
      orderDate: order.orderDate || "",
    },
    validationSchema: editOrderDetailsValidation,
    onSubmit: async (values) => {
      console.log("Form submitted", values);
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      alert(backendUrl); 

      try {
        const response = await axios.put(
          `${backendUrl}/orderDatais/${order.orderId}`,
          values
        );
        if (response.status === 200) {
          onSave(values);
          onClose();
        }
      } catch (error) {
        console.error("Error updating order:", error);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-4 md:mx-6 lg:mx-8 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">Edit Order</h3>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Responsive layout */}
          <div className="grid gap-4 mb-4 sm:grid-cols-1 md:grid-cols-2">
            {/* Order ID */}
            <div>
              <label className="block text-gray-700">Order ID</label>
              <input
                type="text"
                name="orderId"
                value={formik.values.orderId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.orderId && formik.errors.orderId ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.orderId}
                </div>
              ) : null}
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-gray-700">Customer Name</label>
              <input
                type="text"
                name="customer"
                value={formik.values.customer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.customer && formik.errors.customer ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.customer}
                </div>
              ) : null}
            </div>
          </div>

          {/* Responsive layout */}
          <div className="grid gap-4 mb-4 sm:grid-cols-1 md:grid-cols-2">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="product"
                value={formik.values.product}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.product && formik.errors.product ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.product}
                </div>
              ) : null}
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.price}
                </div>
              ) : null}
            </div>
          </div>

          {/* Responsive layout */}
          <div className="grid gap-4 mb-4 sm:grid-cols-1 md:grid-cols-2">
            {/* Quantity */}
            <div>
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.quantity}
                </div>
              ) : null}
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="text-red-600 text-sm">
                  {formik.errors.location}
                </div>
              ) : null}
            </div>
          </div>

          {/* Status field with full width */}
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Pending">Pending</option>
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className="text-red-600 text-sm">{formik.errors.status}</div>
            ) : null}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
