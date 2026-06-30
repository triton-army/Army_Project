const token = localStorage.getItem("token");

if (!token) {
    location.href = "login.html";
}

const nickname = localStorage.getItem("nickname");

document.getElementById("welcome").innerText = `${nickname}님 환영합니다.`;

document.getElementById("closetBtn").addEventListener("click", () => {
    location.href = "closet.html";
});

document.getElementById("logoutBtn").addEventListener("click", () => {

    if (!confirm("로그아웃 하시겠습니까?")) return;

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");

    location.href = "login.html";

});

const cityInput = document.getElementById("city");
const weatherBtn = document.getElementById("weatherBtn");

const savedCity = localStorage.getItem("city");

if (savedCity) {
    cityInput.value = savedCity;
    loadWeather(savedCity);
}

weatherBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (!city) {
        alert("도시를 입력해주세요.");
        return;
    }

    localStorage.setItem("city", city);

    loadWeather(city);

});

async function loadWeather(city) {

    const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);

    console.log(response.status);

    const weather = await response.json();

    console.log(weather);

    if (!weather.main || !weather.weather) {
        document.getElementById("weatherBox").innerHTML =
            "<p>날씨 정보를 불러오지 못했습니다.</p>";
        return;
    }

    document.getElementById("weatherBox").innerHTML = `
    <h3>🌤 현재 날씨</h3>
    <p>📍 ${weather.city}</p>
    <p>🌡 ${weather.temp}℃</p>
    <p>☁ ${weather.weather}</p>
    <p>💧 습도 ${weather.humidity}%</p>
    `;
}
