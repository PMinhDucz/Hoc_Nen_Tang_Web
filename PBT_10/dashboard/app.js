const refreshBtn = document.getElementById("refreshBtn");
const loadTimeBadge = document.getElementById("loadTimeBadge");
const globalOverlay = document.getElementById("globalOverlay");

const usersWidget = document.getElementById("usersWidget");
const weatherWidget = document.getElementById("weatherWidget");
const dogWidget = document.getElementById("dogWidget");

function getSkeleton() {
    return `
        <div class="skeleton-list">
            <div class="skel-item"></div>
            <div class="skel-item"></div>
            <div class="skel-item"></div>
        </div>
    `;
}

function renderError(element, message) {
    element.innerHTML = `<div class="error-state">⚠️ ${message}</div>`;
}

function renderUsers(users) {
    let html = "";
    users.slice(0, 4).forEach(user => {
        const initial = user.name.charAt(0);
        html += `
            <div class="user-item">
                <div class="user-avatar">${initial}</div>
                <div class="user-info">
                    <strong>${user.name}</strong>
                    <span>${user.email}</span>
                </div>
            </div>
        `;
    });
    usersWidget.innerHTML = html;
}

function renderWeather(data) {
    const current = data.current_weather;
    weatherWidget.innerHTML = `
        <div class="weather-data">
            <div class="weather-temp">${current.temperature}°C</div>
            <div class="weather-extra">
                <div>Wind: ${current.windspeed} km/h</div>
                <div>Code: ${current.weathercode}</div>
            </div>
        </div>
    `;
}

function renderDog(url) {
    dogWidget.innerHTML = `<img src="${url}" class="dog-image" alt="Random Dog">`;
}

async function loadDashboard() {
    refreshBtn.disabled = true;
    refreshBtn.querySelector('.icon').classList.add("spin-icon");
    globalOverlay.classList.remove("hidden");
    loadTimeBadge.textContent = "Fetching...";

    usersWidget.innerHTML = getSkeleton();
    weatherWidget.innerHTML = getSkeleton();
    dogWidget.innerHTML = getSkeleton();

    const startTime = Date.now();

    const results = await Promise.allSettled([
        fetch("https://jsonplaceholder.typicode.com/users").then(r => {
            if (!r.ok) throw new Error("User API Error");
            return r.json();
        }),
        fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true").then(r => {
            if (!r.ok) throw new Error("Weather API Error");
            return r.json();
        }),
        fetch("https://dog.ceo/api/breeds/image/random").then(r => {
            if (!r.ok) throw new Error("Dog API Error");
            return r.json();
        })
    ]);

    if (results[0].status === "fulfilled") {
        renderUsers(results[0].value);
    } else {
        renderError(usersWidget, results[0].reason.message);
    }

    if (results[1].status === "fulfilled") {
        renderWeather(results[1].value);
    } else {
        renderError(weatherWidget, results[1].reason.message);
    }

    if (results[2].status === "fulfilled") {
        renderDog(results[2].value.message);
    } else {
        renderError(dogWidget, results[2].reason.message);
    }

    const duration = Date.now() - startTime;
    loadTimeBadge.textContent = `Data loaded in ${duration} ms`;

    refreshBtn.disabled = false;
    refreshBtn.querySelector('.icon').classList.remove("spin-icon");
    globalOverlay.classList.add("hidden");
}

refreshBtn.addEventListener("click", loadDashboard);

loadDashboard();
