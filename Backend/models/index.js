const mongoose = require("mongoose");
const uri =
  "mongodb+srv://abishekbista:tEKtoeRxIodBrLn2@cluster0.htfsrbc.mongodb.net/?retryWrites=true&w=majority";

function main() {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Succesfull");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

module.exports = { main };
