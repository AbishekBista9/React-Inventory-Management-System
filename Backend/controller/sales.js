const Sales = require("../models/sales");
const soldStock = require("../controller/soldStock");
const { purchaseStock } = require("./purchaseStock");

// Add Sales
const addSales = (req, res) => {
  const addSale = new Sales({
    userID: req.body.userID,
    ProductID: req.body.productID,
    StoreID: req.body.storeID,
    StockSold: req.body.stockSold,
    SaleDate: req.body.saleDate,
    TotalSaleAmount: req.body.totalSaleAmount,
  });

  addSale
    .save()
    .then((result) => {
      soldStock(req.body.productID, req.body.stockSold);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Sales Data
const getSalesData = async (req, res) => {
  const findAllSalesData = await Sales.find({ userID: req.params.userID })
    .sort({ _id: -1 })
    .populate("ProductID")
    .populate("StoreID"); // -1 for descending order
  res.json(findAllSalesData);
};

// Get total sales amount
const getTotalSalesAmount = async (req, res) => {
  let totalSaleAmount = 0;
  const salesData = await Sales.find({ userID: req.params.userID });
  salesData.forEach((sale) => {
    totalSaleAmount += sale.TotalSaleAmount;
  });
  res.json({ totalSaleAmount });
};

const getMonthlySales = async (req, res) => {
  try {
    const sales = await Sales.find();

    // Initialize array with 12 zeros
    const salesAmount = [];
    salesAmount.length = 12;
    salesAmount.fill(0);

    sales.forEach((sale) => {
      const monthIndex = parseInt(sale.SaleDate.split("-")[1]) - 1;

      salesAmount[monthIndex] += sale.TotalSaleAmount;
    });

    res.status(200).json({ salesAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// get top 5 selling products
const getTopSellingProducts = async (req, res) => {
  try {
    const salesData = await Sales.find({ userID: req.params.userID })
      .sort({
        StockSold: -1,
      })
      .limit(5)
      .populate("ProductID")
      .populate("StoreID");

    res.json(salesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const returnOrder = async (req, res) => {
  try {
    console.log("req body: ", req.body);

    const returnOrder = await Sales.deleteOne({ _id: req.body._id });

    purchaseStock(req.body.productID, req.body.StockSold);

    res.json({ returnOrder });
  } catch (error) {
    console.error("Error updating sales return stock ", error);
  }
};

module.exports = {
  addSales,
  getMonthlySales,
  getSalesData,
  getTotalSalesAmount,
  getTopSellingProducts,
  returnOrder,
};
