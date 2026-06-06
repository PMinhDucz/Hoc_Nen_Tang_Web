const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const historyList = document.getElementById("historyList");
const statusMessage = document.getElementById("statusMessage");
const spinner = document.getElementById("spinner");
const weatherResult = document.getElementById("weatherResult");

const cityNameDisplay = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperatureDisplay = document.getElementById("temperature");
const weatherDesc = document.getElementById("weatherDesc");
const humidityDisplay = document.getElementById("humidity");
const windSpeedDisplay = document.getElementById("windSpeed");

let searchHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];

function saveHistory(city) {
    if (!city) return;
    const lowerCity = city.toLowerCase();
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== lowerCity);
    searchHistory.unshift(city);
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    localStorage.setItem("weatherHistory", JSON.stringify(searchHistory));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    searchHistory.forEach(city => {
        const tag = document.createElement("span");
        tag.className = "history-tag";
        tag.textContent = city;
        tag.addEventListener("click", () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        historyList.appendChild(tag);
    });
}

function showState(state, message = "") {
    spinner.classList.add("hidden");
    statusMessage.classList.add("hidden");
    weatherResult.classList.add("hidden");
    statusMessage.className = "status hidden";

    if (state === "loading") {
        spinner.classList.remove("hidden");
    } else if (state === "error") {
        statusMessage.classList.remove("hidden");
        statusMessage.classList.add("error");
        statusMessage.textContent = message;
    } else if (state === "success") {
        weatherResult.classList.remove("hidden");
    }
}

function getWeatherInterpretation(code) {
    if (code === 0) return { desc: "Trời quang", icon: "☀️" };
    if (code === 1 || code === 2 || code === 3) return { desc: "Nhiều mây", icon: "⛅" };
    if (code >= 45 && code <= 48) return { desc: "Sương mù", icon: "🌫️" };
    if (code >= 51 && code <= 67) return { desc: "Mưa", icon: "🌧️" };
    if (code >= 71 && code <= 77) return { desc: "Tuyết", icon: "❄️" };
    if (code >= 80 && code <= 82) return { desc: "Mưa rào", icon: "🌦️" };
    if (code >= 95 && code <= 99) return { desc: "Bão sấm chớp", icon: "⛈️" };
    return { desc: "Không rõ", icon: "🌍" };
}

async function fetchWeather(city) {
    if (!city.trim()) return;
    
    showState("loading");
    
    try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        if (!geoResponse.ok) {
            throw new Error("Lỗi kết nối khi tìm thành phố.");
        }
        
        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Không tìm thấy thành phố này.");
        }
        
        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const displayName = geoData.results[0].name;
        
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
            throw new Error("Lỗi khi lấy dữ liệu thời tiết.");
        }
        
        const weatherData = await weatherResponse.json();
        const current = weatherData.current;
        const interpretation = getWeatherInterpretation(current.weather_code);
        
        cityNameDisplay.textContent = displayName;
        temperatureDisplay.textContent = `${current.temperature_2m}°C`;
        weatherIcon.textContent = interpretation.icon;
        weatherDesc.textContent = interpretation.desc;
        humidityDisplay.textContent = `${current.relative_humidity_2m}%`;
        windSpeedDisplay.textContent = `${current.wind_speed_10m} km/h`;
        
        showState("success");
        saveHistory(displayName);
        
    } catch (error) {
        showState("error", error.message);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchWeather(cityInput.value);
});

renderHistory();
