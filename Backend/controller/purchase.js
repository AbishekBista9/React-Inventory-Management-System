const Purchase = require("../models/purchase");
const { purchaseStock } = require("./purchaseStock");
const { updateStock } = require("./purchaseStock");

// Add Purchase Details
const addPurchase = (req, res) => {
  const addPurchaseDetails = new Purchase({
    userID: req.body.userID,
    ProductID: req.body.productID,
    QuantityPurchased: req.body.quantityPurchased,
    PurchaseDate: req.body.purchaseDate,
    TotalPurchaseAmount: req.body.totalPurchaseAmount,
  });

  addPurchaseDetails
    .save()
    .then((result) => {
      purchaseStock(req.body.productID, req.body.quantityPurchased);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Purchase Data
const getPurchaseData = async (req, res) => {
  const findAllPurchaseData = await Purchase.find({ userID: req.params.userID })
    .sort({ _id: -1 })
    .populate("ProductID"); // -1 for descending order
  res.json(findAllPurchaseData);
};

// Get total purchase amount
const getTotalPurchaseAmount = async (req, res) => {
  let totalPurchaseAmount = 0;
  const purchaseData = await Purchase.find({ userID: req.params.userID });
  purchaseData.forEach((purchase) => {
    totalPurchaseAmount += purchase.TotalPurchaseAmount;
  });
  res.json({ totalPurchaseAmount });
};

// Update selected purchase details
const updateSelectedPurchase = async (req, res) => {
  console.log("request body", req.body);
  try {
    const updatedResult = await Purchase.findByIdAndUpdate(
      { _id: req.body.purchaseID },
      {
        QuantityPurchased: req.body.QuantityPurchased,
        PurchaseDate: req.body.PurchaseDate,
        TotalPurchaseAmount: req.body.TotalPurchaseAmount,
      },
      { new: true }
    );
    console.log("update result", updatedResult);
    updateStock(
      req.body.productID,
      req.body.QuantityPurchased,
      req.body.oldPurchaseQuantity
    );
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Delete selected purchase
const deleteSelectedPurchase = async (req, res) => {
  const deletePurchase = await Purchase.deleteOne({ _id: req.params.id });

  res.json({ deletePurchase });
};

module.exports = {
  addPurchase,
  getPurchaseData,
  getTotalPurchaseAmount,
  updateSelectedPurchase,
  deleteSelectedPurchase,
};
