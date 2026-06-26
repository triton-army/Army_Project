const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const city = "Changwon";

        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    q: city,
                    appid: process.env.OPENWEATHER_API_KEY,
                    units: "metric",
                    lang: "kr"
                }
            }
        );

        const weather = response.data;

        res.json({
            city: weather.name,
            temp: weather.main.temp,
            feelsLike: weather.main.feels_like,
            humidity: weather.main.humidity,
            weather: weather.weather[0].description
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "날씨 정보를 가져오지 못했습니다."
        });
    }
});

module.exports = router;