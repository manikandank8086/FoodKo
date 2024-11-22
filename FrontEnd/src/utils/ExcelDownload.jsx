import * as XLSX from "xlsx";

export const generateExcelFile = (orderData, fileName = "Order_List.xlsx") => {
  // Transform data to the Excel format
  const formattedData = orderData.map((order) => ({
    Date: new Date(order.orderDate).toLocaleDateString(),
    "Order ID": order.orderId,
    "Customer Name": order.customerName,
    "Product Name": order.item,
    Price: `$${order.price}`,
    Quantity: order.quantity,
    Location: order.location,
    Status: order.status,
  }));

  // Create a new workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Order List");

  // Style the worksheet header
  const headerStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "FFFF99" } }, 
    alignment: { horizontal: "center", vertical: "center" },
  };
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  for (let C = range.s.c; C <= range.e.c; C++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!worksheet[cellAddress]) continue;
    worksheet[cellAddress].s = headerStyle;
  }

  worksheet["!cols"] = [
    { wch: 15 },
    { wch: 20 },
    { wch: 25 },
    { wch: 30 },
    { wch: 10 },
    { wch: 10 },
    { wch: 20 },
    { wch: 15 },
  ];

  // Download the Excel file
  XLSX.writeFile(workbook, fileName);
};
