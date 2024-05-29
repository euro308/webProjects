let input = document.querySelector(".citySelect")
let button = document.querySelector(".submitButton")
let weatherDiv = document.querySelector(".weather")
let refreshButton = document.querySelector(".refreshButton")
let refreshInfo = document.querySelector(".refresh")

let apiKey = 'ea7e255b031f4cd197d105636242805';
let timer = null

async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    const response = await fetch(url);
    return await response.json()
}

async function loadWeather() {
    if (timer) {
        clearInterval(timer);
    }

    weatherDiv.innerHTML = ""
    weatherDiv.style.border = "2px solid #a0acc0"

    let data = await getWeather(input.value)

    let currentTemp = document.createElement("span")
    currentTemp.innerHTML = "Current Temperature: " + data.current.temp_c + " °C"

    let conditionDiv = document.createElement("div")

    let conditionImg = document.createElement("img")
    conditionImg.className = "img"
    conditionImg.src = data.current.condition.icon

    let conditionStatus = document.createElement("span")
    conditionStatus.innerHTML = data.current.condition.text

    conditionDiv.append(conditionImg)
    conditionDiv.append(conditionStatus)

    weatherDiv.append(currentTemp)
    weatherDiv.append(conditionDiv)

    refreshInfo.innerHTML = ``
    refreshButton.innerHTML = ""

    let time = 120;
    timer = setInterval(function () {
        if (time < 0) {
            clearInterval(timer);
            loadWeather()
        } else {
            refreshInfo.innerHTML = `Weather info will refresh in... ${time}s.`;
        }
        time--;
    }, 1000);

    refreshInfo.innerHTML = `Weather info will refresh in... ${time}s.`
    refreshButton.innerHTML = "Refresh now."
}

input.addEventListener("input", (e) => {
    button.disabled = e.target.value.length <= 0;
})

button.addEventListener("click", loadWeather)
refreshButton.addEventListener("click", loadWeather)
