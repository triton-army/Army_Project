const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    temp: 28,
    humidity: 70,
    weather: "맑음"
  });
});

module.exports = router;