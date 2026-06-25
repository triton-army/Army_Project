const express = require("express");
const path = require("path");

const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/weather", weatherRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});