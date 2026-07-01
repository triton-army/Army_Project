const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const city = req.query.city;

        // 1. 도시명 → 위도/경도 조회
        const geoResponse = await axios.get(
            "https://api.openweathermap.org/geo/1.0/direct",
            {
                params: {
                    q: city,
                    limit: 1,
                    appid: process.env.OPENWEATHER_API_KEY
                }
            }
        );

        if (geoResponse.data.length === 0) {
            return res.status(404).json({
                message: "지역을 찾을 수 없습니다."
            });
        }

        const lat = geoResponse.data[0].lat;
        const lon = geoResponse.data[0].lon;
        const cityName = geoResponse.data[0].name;

        // 2. 위도/경도로 날씨 조회
        const weatherResponse = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    lat,
                    lon,
                    appid: process.env.OPENWEATHER_API_KEY,
                    units: "metric",
                    lang: "kr"
                }
            }
        );

        res.json({
            city: cityName,
            lat,
            lon,
            temp: weatherResponse.data.main.temp,
            feelsLike: weatherResponse.data.main.feels_like,
            humidity: weatherResponse.data.main.humidity,
            weather: weatherResponse.data.weather[0].description
        });

    } catch (err) {

        console.log("===== ERROR =====");
        console.log(err.response?.data || err.message);

        res.status(500).json({
            message: "날씨 조회 실패",
            error: err.response?.data || err.message
        });

    }

});

module.exports = router;