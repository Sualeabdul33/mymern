const app = require("./app");
const mongoose = require("mongoose");

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
mongoose.connect(process.env.MONGODB, () => {
  console.log("DB connection established");
});
