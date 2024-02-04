const express = require("express");
const app = express();
const sales = require("../controller/sales");

// Add Sales
app.post("/add", sales.addSales);

// Get All Sales
app.get("/get/:userID", sales.getSalesData);
app.get("/getmonthly", sales.getMonthlySales);
app.get("/get/:userID/topfivesales", sales.getTopSellingProducts);

app.get("/get/:userID/totalsaleamount", sales.getTotalSalesAmount);
app.post("/return", sales.returnOrder);

module.exports = app;

// http://localhost:4000/api/sales/add POST
// http://localhost:4000/api/sales/get GET
