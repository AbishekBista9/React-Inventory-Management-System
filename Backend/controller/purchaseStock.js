const Purchase = require("../models/purchase");
const Product = require("../models/product");

const purchaseStock = async (productID, purchaseStockData) => {
  // Updating Purchase stock
  try {
    const myProductData = await Product.findOne({ _id: productID });
    console.log("my product data: ", myProductData);
    let myUpdatedStock =
      parseInt(myProductData.stock) + parseInt(purchaseStockData);

    const PurchaseStock = await Product.findByIdAndUpdate(
      { _id: productID },
      {
        stock: myUpdatedStock,
      },
      { new: true }
    );
    console.log(PurchaseStock);
  } catch (error) {
    console.error("Error updating Purchase stock ", error);
  }
};

const updateStock = async (productID, purchaseStockData, oldStockData) => {
  try {
    const myProductData = await Product.findOne({ _id: productID });

    if (!myProductData) {
      console.error("Product not found");
      return;
    }

    const myUpdatedStock =
      parseInt(myProductData.stock) +
      parseInt(purchaseStockData) -
      parseInt(oldStockData);

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productID },
      {
        stock: myUpdatedStock,
      },
      { new: true }
    );

    console.log("Updated Product:", updatedProduct);
  } catch (error) {
    console.error("Error updating Purchase stock ", error);
  }
};

module.exports = { purchaseStock, updateStock };
