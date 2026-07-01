require("dotenv").config();

const express = require("express");
const path = require("path");

const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/authRoutes");
const clothesRoutes = require("./routes/clothesRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/weather", weatherRoutes);
app.use("/auth", authRoutes);
app.use("/clothes", clothesRoutes);
app.use("/weather", require("./routes/weatherRoutes"));
app.use("/outfits", require("./routes/outfitRoutes"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});