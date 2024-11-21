import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup'; // Import Yup for validation
import { editOrderDetailsValidation } from '../utils/Validation'; // Validation schema

const Modal = ({ order, onClose, onSave }) => {
  // Initialize formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      orderId: order.orderId,
      customer: order.customerName, // Updated to match validation field name
      product: order.item, // Updated to match validation field name
      price: order.price,
      quantity: order.quantity,
      location: order.location,
      status: order.status || '',  // Add status field
      orderDate: order.orderDate || ''  // Add order date field
    },
    validationSchema: editOrderDetailsValidation,
    onSubmit: async (values) => {
        console.log("Form submitted", values);  // Check if the form is submitted

      try {
        const response = await axios.put(`http://localhost:3000/orderDatais/${order.orderId}`, values);
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
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Order</h3>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* First row with two fields */}
          <div className="flex space-x-4 mb-4">
            {/* Order ID */}
            <div className="flex-1">
              <label className="block text-gray-700">Order ID</label>
              <input
                type="text"
                name="orderId"
                value={formik.values.orderId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded"
              />
              {formik.touched.orderId && formik.errors.orderId ? (
                <div className="text-red-600 text-sm">{formik.errors.orderId}</div>
              ) : null}
            </div>

            {/* Customer Name */}
            <div className="flex-1">
              <label className="block text-gray-700">Customer Name</label>
              <input
                type="text"
                name="customer"
                value={formik.values.customer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded"
              />
              {formik.touched.customer && formik.errors.customer ? (
                <div className="text-red-600 text-sm">{formik.errors.customer}</div>
              ) : null}
            </div>
          </div>

          {/* Second row with two fields */}
          <div className="flex space-x-4 mb-4">
            {/* Product Name */}
            <div className="flex-1">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="product"
                value={formik.values.product}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded"
              />
              {formik.touched.product && formik.errors.product ? (
                <div className="text-red-600 text-sm">{formik.errors.product}</div>
              ) : null}
            </div>

            {/* Price */}
            <div className="flex-1">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded"
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-red-600 text-sm">{formik.errors.price}</div>
              ) : null}
            </div>
          </div>

          {/* Third row with two fields */}
          <div className="flex space-x-4 mb-4">
            {/* Quantity */}
            <div className="flex-1">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded"
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="text-red-600 text-sm">{formik.errors.quantity}</div>
              ) : null}
            </div>

            {/* Location */}
            <div className="flex-1">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded"
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="text-red-600 text-sm">{formik.errors.location}</div>
              ) : null}
            </div>
          </div>

          {/* Fourth row with status and date */}
          <div className="flex space-x-4 mb-4">
            {/* Status */}
            <div className="flex-1">
              <label className="block text-gray-700">Status</label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Pending">Pending</option>
              </select>
              {formik.touched.status && formik.errors.status ? (
                <div className="text-red-600 text-sm">{formik.errors.status}</div>
              ) : null}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              className="bg-blue-600 text-white px-4 py-2 rounded"
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


