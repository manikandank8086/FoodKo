import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  MoreVertical,
  Download,
  Edit,
  Trash2,
  Bell,
  MessageCircle,
  Gift,
  Settings,
  Package,
  Truck,
  XCircle,
  DollarSign,
  Calendar,
} from "lucide-react";
import axios from "axios";
import { addOrderValidation } from "../utils/Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/EditModal";
import { generateExcelFile } from "../utils/ExcelDownload";

const monthlyData = Array.from({ length: 12 }, (_, i) => ({
  name: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][i],
  value2020: Math.floor(Math.random() * 50) + 25,
  value2021: Math.floor(Math.random() * 50) + 50,
}));

const PieData = [
  { name: "Total Orders", value: 23, color: "#4CD964" },
  { name: "Growth", value: 56, color: "#5B8FF9" },
  { name: "Total Revenue", value: 68, color: "#FF6B6B" },
];

const weeklyData = [
  { name: "Day 1", value: 0 },
  { name: "Day 2", value: 0 },
  { name: "Day 3", value: 0 },
  { name: "Day 4", value: 1 },
  { name: "Day 5", value: 6 },
  { name: "Day 6", value: 0 },
  { name: "Day 7", value: 0 },
];

const data = [
  { name: "Jan", value2020: 4000, value2021: 2400 },
  { name: "Feb", value2020: 3000, value2021: 1398 },
  { name: "Mar", value2020: 2000, value2021: 9800 },
  { name: "Apr", value2020: 2780, value2021: 3908 },
  { name: "May", value2020: 1890, value2021: 4800 },
  { name: "Jun", value2020: 2390, value2021: 3800 },
  { name: "Jul", value2020: 3490, value2021: 4300 },
  { name: "Aug", value2020: 4000, value2021: 2400 },
  { name: "Sep", value2020: 3000, value2021: 1398 },
  { name: "Oct", value2020: 2000, value2021: 9800 },
  { name: "Nov", value2020: 2780, value2021: 3908 },
  { name: "Dec", value2020: 1890, value2021: 4800 },
];

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrder, setTotalOrderCount] = useState(0);
  const [totalDelivered, setDeliveredCount] = useState(0);
  const [totalCancellCount, setTotalCancelCount] = useState(0);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleExcelDownload = (orderData) => {
    generateExcelFile(orderData);
  };

  useEffect(() => {
    const fetchOrderData = () => {
      axios
        .get(`https://foodko.instantfix.online/orderDatais`)
        .then((res) => {
          if (res.data.success) {
            console.log("Data fetched successfully");
            console.log(res.data.data);

            const {
              orderDetails,
              totalOrders,
              totalDeliveredCount,
              totalCancelledCount,
              totalRevenue,
            } = res.data.data;

            setOrderData(orderDetails);
            setTotalOrderCount(totalOrders);
            setTotalCancelCount(totalCancelledCount);
            setTotalRevenue(totalRevenue);
            setDeliveredCount(totalDeliveredCount);
          } else {
            console.error("Failed to fetch data");
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };
    fetchOrderData();
  }, []);

  const formik = useFormik({
    initialValues: {
      customer: "",
      product: "",
      price: "",
      quantity: "",
      date: "",
      location: "",
      status: "Delivered",
    },
    validationSchema: addOrderValidation,
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted", values);

      axios
        .post(`https://foodko.instantfix.online/addOrder`, values)
        .then((res) => {
          if (res.data.success) {
            resetForm();
            setIsModalOpen(false);
            toast.success(res.data.message);
            window.location.reload();
          } else {
            toast.error(res.data.message);
            console.log("Order not added");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const handleAddOrderClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const handleClearAllOrderDetails = async (req, res) => {
    try {
      const response = await axios.delete(`https://foodko.instantfix.online/orderDetails`);
      if (response.status === 200) {
        toast.success("Delete Success");
        setOrderData([]);
      }
    } catch (error) {
      toast.error("Cannot delete all orders");
      console.log(error);
    }
  };

  const handleDeleteItem = async (orderId) => {
    try {
      const response = await axios.delete(
        `https://foodko.instantfix.online/order/${orderId}`
      );
      if (response.status === 200) {
        toast.success("Delete Success");
        setOrderData((prevOrders) =>
          prevOrders.filter(
            (order) => String(order.orderId) !== String(orderId)
          )
        );
      }
    } catch (error) {
      toast.error(error.data.message);
      console.error("Error updating order:", error);
    }
  };

  const [filters, setFilters] = useState({
    date: "",
    orderId: "",
    location: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "orderDate",
    direction: "asc",
  });

  const handleFilterChange = (e, filterKey) => {
    const value = e.target.value;

    if (filterKey === "date") {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: value,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterKey]: value,
      }));
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Convert the order date to a Date object for proper sorting
  const filteredData = orderData
    .filter((order) => {
      return (
        (filters.date
          ? new Date(order.orderDate).toISOString().split("T")[0] ===
            filters.date
          : true) &&
        (filters.orderId
          ? order.orderId.toLowerCase().includes(filters.orderId.toLowerCase())
          : true) &&
        (filters.location
          ? order.location
              .toLowerCase()
              .includes(filters.location.toLowerCase())
          : true)
      );
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Ensure proper comparison for dates
      const aDate = sortConfig.key === "orderDate" ? new Date(aValue) : aValue;
      const bDate = sortConfig.key === "orderDate" ? new Date(bValue) : bValue;

      if (sortConfig.direction === "asc") {
        return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
      } else {
        return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
      }
    });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left section for the search bar */}
            <div className="flex items-center flex-1 space-x-6">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* Right section for notifications and profile */}
            <div className="flex items-center space-x-6">
              {[
                {
                  icon: Bell,
                  count: 14,
                  bgColor: "bg-blue-100",
                  badgeColor: "bg-blue-500",
                },
                {
                  icon: MessageCircle,
                  count: 53,
                  bgColor: "bg-blue-100",
                  badgeColor: "bg-blue-500",
                },
                {
                  icon: Gift,
                  count: 15,
                  bgColor: "bg-gray-200",
                  badgeColor: "bg-gray-500",
                },
                {
                  icon: Settings,
                  count: 19,
                  bgColor: "bg-red-100",
                  badgeColor: "bg-red-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`relative p-3 rounded-lg ${item.bgColor}`}
                >
                  <item.icon className="text-gray-600" size={24} />
                  <span
                    className={`absolute -top-1 -right-1 w-5 h-5 ${item.badgeColor} text-white text-xs flex items-center justify-center rounded-full`}
                  >
                    {item.count}
                  </span>
                </div>
              ))}

              {/* User profile section */}
              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  Hello, <strong>Samantha</strong>
                </span>
                <img
                  src="\public\uploads\profile-pic.webp"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
              <span className="text-gray-600 text-sm">
                Hi Samantha, Welcome back to Sedap Admin!
              </span>
            </div>

            <button className="flex items-center space-x-2 border rounded-lg px-3 py-1.5 text-sm">
              <span>Filter</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-6">
            {[
              {
                icon: Package,
                value: totalOrder,
                label: "Total Orders",
                change: "+12.5%",
                color: "bg-green-100",
              },
              {
                icon: Truck,
                value: totalDelivered,
                label: "Total Delivered",
                change: "+8.3%",
                color: "bg-green-100",
              },
              {
                icon: XCircle,
                value: totalCancellCount,
                label: "Total Cancelled",
                change: "-3.2%",
                color: "bg-green-100",
              },
              {
                icon: DollarSign,
                value: totalRevenue,
                label: "Total Revenue",
                change: "+5.1%",
                color: "bg-green-100",
              },
            ].map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4"
              >
                <div className={`${metric.color} p-3 rounded-full`}>
                  <metric.icon size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{metric.value}</h3>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-xs text-gray-400">{metric.change}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Pie Charts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Pie Chart</h3>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Chart</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-red-500">Show Value</span>
                  </label>
                  <MoreVertical size={20} className="text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {PieData.map((data, index) => (
                  <div key={index} className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { value: data.value },
                            { value: 100 - data.value },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          dataKey="value"
                        >
                          <Cell fill={data.color} />
                          <Cell fill="#F3F4F6" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="text-center text-sm mt-2">{data.name}</p>
                    <p className="text-center font-semibold">{data.value}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Chart Order</h3>
                <button className="text-blue-500 text-sm flex items-center">
                  <Download size={16} className="mr-1" />
                  Save Report
                </button>
              </div>
              <div className="h-64">
                {weeklyData.length === 0 ? (
                  <div>No data available</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#5B8FF9"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold mb-6">Total Revenue</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value2020"
                    stroke="#5B8FF9"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value2021"
                    stroke="#FF6B6B"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Order List</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      className="text-green-500 flex items-center"
                      onClick={handleAddOrderClick}
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      Add Order
                    </button>
                    <button
                      className="text-gray-500"
                      onClick={handleClearAllOrderDetails}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>

              {/* ToastContainer should be placed here so it's always available */}
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />

              {/* Download Report Button Positioned Near the Table */}
              <div className="flex justify-end mb-4">
                <button
                  className="text-blue-500 text-sm flex items-center"
                  onClick={() => handleExcelDownload(filteredData)}
                >
                  <Download size={16} className="mr-1" />
                  Download Report
                </button>
              </div>

              {/* Add Order Modal */}

              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
                    <h3 className="text-lg font-semibold mb-4">Add Order</h3>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Customer Name */}
                        <div>
                          <label className="block mb-1">Customer Name</label>
                          <input
                            type="text"
                            name="customer"
                            className="w-full border rounded-md px-3 py-2"
                            value={formik.values.customer}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.customer &&
                            formik.errors.customer && (
                              <div className="text-red-500 text-sm">
                                {formik.errors.customer}
                              </div>
                            )}
                        </div>
                        {/* Product Name */}
                        <div>
                          <label className="block mb-1">Product Name</label>
                          <input
                            type="text"
                            name="product"
                            className="w-full border rounded-md px-3 py-2"
                            value={formik.values.product}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.product && formik.errors.product && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.product}
                            </div>
                          )}
                        </div>
                        {/* Price */}
                        <div>
                          <label className="block mb-1">Price</label>
                          <input
                            type="number"
                            name="price"
                            className="w-full border rounded-md px-3 py-2"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.price && formik.errors.price && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.price}
                            </div>
                          )}
                        </div>
                        {/* Quantity */}
                        <div>
                          <label className="block mb-1">Quantity</label>
                          <input
                            type="number"
                            name="quantity"
                            className="w-full border rounded-md px-3 py-2"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.quantity &&
                            formik.errors.quantity && (
                              <div className="text-red-500 text-sm">
                                {formik.errors.quantity}
                              </div>
                            )}
                        </div>
                        {/* Date */}
                        <div>
                          <label className="block mb-1">Date</label>
                          <input
                            type="date"
                            name="date"
                            className="w-full border rounded-md px-3 py-2"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.date && formik.errors.date && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.date}
                            </div>
                          )}
                        </div>
                        {/* Location */}
                        <div>
                          <label className="block mb-1">Location</label>
                          <input
                            type="text"
                            name="location"
                            className="w-full border rounded-md px-3 py-2"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.location &&
                            formik.errors.location && (
                              <div className="text-red-500 text-sm">
                                {formik.errors.location}
                              </div>
                            )}
                        </div>
                        {/* Status */}
                        <div>
                          <label className="block mb-1">Status</label>
                          <select
                            name="status"
                            className="w-full border rounded-md px-3 py-2"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Pending">Pending</option>
                          </select>
                          {formik.touched.status && formik.errors.status && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.status}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          type="button"
                          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Save Order
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="flex space-x-4 mb-4">
                <div className="relative">
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => handleFilterChange(e, "date")}
                    className="w-full border rounded-full px-4 py-2 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.orderId}
                    onChange={(e) => handleFilterChange(e, "orderId")}
                    placeholder="Order ID"
                    className="w-full border rounded-full px-4 py-2 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange(e, "location")}
                    placeholder="Location"
                    className="w-full border rounded-full px-4 py-2 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Table Section */}
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    {[
                      "Date",
                      "Order Id",
                      "Customer Name",
                      "Product Name",
                      "Price",
                      "Quantity",
                      "Location",
                      "Status",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="text-left py-4 px-6 font-medium text-gray-600 cursor-pointer"
                        onClick={() =>
                          handleSort(header.toLowerCase().replace(" ", ""))
                        }
                      >
                        {header}
                        {sortConfig.key ===
                          header.toLowerCase().replace(" ", "") && (
                          <span>
                            {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                          </span>
                        )}
                      </th>
                    ))}
                    <th className="text-left py-4 px-6 font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition duration-150"
                    >
                      <td className="py-4 px-6">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">{order.orderId}</td>
                      <td className="py-4 px-6">{order.customerName}</td>
                      <td className="py-4 px-6">{order.item}</td>
                      <td className="py-4 px-6">${order.price}</td>
                      <td className="py-4 px-6">{order.quantity}</td>
                      <td className="py-4 px-6">{order.location}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-4">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => handleEditClick(order)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteItem(order.orderId)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Render Modal outside of the table */}
              {isEditModalOpen && selectedOrder && (
                <Modal
                  order={selectedOrder}
                  onClose={() => setIsEditModalOpen(false)}
                  onSave={(updatedOrder) => {
                    setIsEditModalOpen(false);
                    window.location.reload();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
