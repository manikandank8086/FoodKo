import * as Yup from "yup";

export const addOrderValidation = Yup.object({
  customer: Yup.string()
    .required("Customer name is required")
    .min(3, "Customer name must be at least 3 characters")
    .matches(
      /^[a-zA-Z ]*$/,
      "Customer name can only contain letters and spaces"
    ),

  product: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters"),

  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(0.01, "Price must be greater than zero"),

  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  date: Yup.date().required("Date is required"),
  location: Yup.string()
    .required("Location is required")
    .min(3, "Location must be at least 3 characters"),
  status: Yup.string().required("Status is required"),
});

// Validation Schema
export const editOrderDetailsValidation = Yup.object({
    orderId: Yup.string()
      .required("Order ID is required")
      .length(6, "Order ID must be exactly 6 characters")
      .matches(
        /^\d{6}$/,
        "Order ID must be exactly 6 digits and cannot contain letters"
      ),
  
    customer: Yup.string()
      .required("Customer name is required")
      .min(3, "Customer name must be at least 3 characters")
      .matches(
        /^[a-zA-Z ]*$/,
        "Customer name can only contain letters and spaces"
      ),
  
    product: Yup.string()
      .required("Product name is required")
      .min(2, "Product name must be at least 2 characters"),
  
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number")
      .min(0.01, "Price must be greater than zero"),
  
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be a positive number")
      .integer("Quantity must be an integer")
      .min(1, "Quantity must be at least 1"),
  
    location: Yup.string()
      .required("Location is required")
      .min(5, "Location must be at least 5 characters"),
  
    status: Yup.string().required("Status is required"),
  });