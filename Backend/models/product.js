const mongoose = require("mongoose");

// Check if the model already exists
if (mongoose.models.Product) {
  module.exports = mongoose.models.Product;
} else {
  // Define the model only if it doesn't exist
  const ProductSchema = new mongoose.Schema(
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      manufacturer: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
      description: String,
    },
    { timestamps: true }
  );

  const Product = mongoose.model("product", ProductSchema);
  module.exports = Product;
}
