'use client'

import { useState } from 'react'
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Search, Bell, ShoppingCart, Users, BarChart2, Star, Coffee, Calendar, MessageCircle, Wallet, ChevronDown, MoreVertical, Download, Edit, Trash2, User2 } from 'lucide-react'

// Sample data for charts
const pieData = [
  { name: 'Total Order', value: 81, color: '#FF6B6B' },
  { name: 'Growth', value: 22, color: '#4CD964' },
  { name: 'Total Revenue', value: 62, color: '#5B8FF9' },
]

const weeklyData = Array.from({ length: 7 }, (_, i) => ({
  name: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i],
  value: Math.floor(Math.random() * 100) + 50
}))

const monthlyData = Array.from({ length: 12 }, (_, i) => ({
  name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  value2020: Math.floor(Math.random() * 50) + 25,
  value2021: Math.floor(Math.random() * 50) + 50,
}))

const orderData = [
  { date: '23/06/24', orderId: '#675121', customer: 'JohnSmith', product: 'Fish pie', price: 154.1, quantity: 3, location: 'sigiriya', status: 'Delivered' },
  { date: '14/06/24', orderId: '#675122', customer: 'David K', product: 'Chocolate', price: 540.1, quantity: 1, location: 'gampaha', status: 'Cancelled' },
  { date: '11/06/24', orderId: '#675123', customer: 'Beth Hall', product: 'Ice cream cake', price: 158.2, quantity: 5, location: 'gamp', status: 'Pending' },
  { date: '20/07/24', orderId: '#675124', customer: 'Ryan Shaw', product: 'Blue cheese', price: 20.5, quantity: 5, location: 'agmbe', status: 'Delivered' },
  { date: '25/11/24', orderId: '#675125', customer: 'Natalie', product: 'Donut holes', price: 125.2, quantity: 3, location: 'agmbe', status: 'Delivered' },
]

  const Home=()=> {
  const [selectedPeriod, setSelectedPeriod] = useState('Last Week')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Hi Samantha, Welcome back to FoodKo Admin!</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here"
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="flex items-center space-x-4">
              {/* Notification Icons */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="text-gray-600 w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full">2</span>
                </div>
                <div className="relative">
                  <ShoppingCart className="text-gray-600 w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full">3</span>
                </div>
                <div className="relative">
                  <User2 className="text-gray-600 w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">5</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Hello, Samantha</span>
                <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-8 h-8 rounded-full" />
              </div>
              <button className="flex items-center space-x-2 border rounded-lg px-3 py-1.5 text-sm">
                <span>Filter Periods</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Orders', value: '75', icon: ShoppingCart, color: 'bg-blue-100' },
            { title: 'Total Delivered', value: '357', icon: ShoppingCart, color: 'bg-green-100' },
            { title: 'Total Cancelled', value: '65', icon: ShoppingCart, color: 'bg-red-100' },
            { title: 'Total Revenue', value: '$128', icon: ShoppingCart, color: 'bg-purple-100' },
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4">
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon size={24} className="text-gray-700" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">{metric.title}</h3>
                <p className="text-2xl font-semibold">{metric.value}</p>
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
                <button className="px-3 py-1 text-sm border rounded">Chart</button>
                <button className="px-3 py-1 text-sm border rounded bg-gray-100">Show Value</button>
                <MoreVertical size={20} className="text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {pieData.map((data, index) => (
                <div key={index} className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{ value: data.value }, { value: 100 - data.value }]}
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
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <Line type="monotone" dataKey="value" stroke="#5B8FF9" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold mb-6">Total Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <Line type="monotone" dataKey="value2020" stroke="#5B8FF9" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="value2021" stroke="#FF6B6B" strokeWidth={2} dot={{ r: 4 }} />
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
                <button className="text-green-500 flex items-center">
                  <ShoppingCart size={16} className="mr-1" />
                  Add Order
                </button>
                <button className="text-gray-500">Clear All</button>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <select className="border rounded-md px-3 py-1.5">
                <option>Choose a date</option>
              </select>
              <select className="border rounded-md px-3 py-1.5">
                <option>Select a Order Id</option>
              </select>
              <select className="border rounded-md px-3 py-1.5">
                <option>Select a Location</option>
              </select>
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Order Id</th>
                  <th className="pb-4">Customer Name</th>
                  <th className="pb-4">Product Name</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Quantity</th>
                  <th className="pb-4">Location</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4">{order.date}</td>
                    <td>{order.orderId}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>${order.price}</td>
                    <td>{order.quantity}</td>
                    <td>{order.location}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button className="text-blue-500">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">Page 1 to 50 12</p>
              <div className="flex space-x-2">
                {[1, 2, 3, '...'].map((page, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      page === 1 ? 'bg-blue-500 text-white' : 'text-gray-500'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home