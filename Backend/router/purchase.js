const express = require("express");
const app = express();
const purchase = require("../controller/purchase");

// Add Purchase
app.post("/add", purchase.addPurchase);

// Get All Purchase Data
app.get("/get/:userID", purchase.getPurchaseData);

app.get("/get/:userID/totalpurchaseamount", purchase.getTotalPurchaseAmount);

// Update Selected Purchase
app.post("/update", purchase.updateSelectedPurchase);

// Delete selected product
app.get("/delete/:id", purchase.deleteSelectedPurchase);

module.exports = app;

// http://localhost:4000/api/purchase/add POST
// http://localhost:4000/api/purchase/get GET
