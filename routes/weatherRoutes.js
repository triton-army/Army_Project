const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const city = req.query.city;

        console.log("검색 도시:", req.query.city);

        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    q: `${city},KR`,
                    appid: process.env.OPENWEATHER_API_KEY,
                    units: "metric",
                    lang: "kr"
}
            }
        );

        res.json(response.data);

    } catch (err) {

        console.error("===== OpenWeather Error =====");
        console.error(err.response?.data);
        console.error(err.message);

        res.status(500).json({
            message: "날씨 조회 실패",
            error: err.response?.data || err.message
        });

    }

});

module.exports = router;
