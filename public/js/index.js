const subBtn = document.getElementById("submit");
const inputCity = document.getElementById("cityName");
const cityField = document.getElementById("city");
const outputStatus = document.getElementById("status-layer");
const currentTemp = document.getElementById("temp");
const currentStatus = document.getElementById("temp-icon");
const day = document.getElementById("day");
const time = document.getElementById("time");
const date = document.getElementById("date");

const apiKey = "c3b4368b6dafb5a33a8ee5d2e37512c1";

const currentDay = () => {
    let weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";
    let currentTime = new Date();
    return weekDay[currentTime.getDay()];
}

const currentTime = () => {
    const currentTime = new Date();
    let hrs = currentTime.getHours();
    let min = currentTime.getMinutes();
    let meridiem = "AM";
    if (hrs >= 12) {
        meridiem = "PM";
        if (hrs > 12) {
            hrs = hrs - 12;
        }
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (hrs < 10) {
        hrs = "0" + hrs;
    }
    return `${hrs}:${min} ${meridiem}`;
}

const currentDate = () => {
    const currentTime = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = currentTime.getMonth();
    return `${months[monthIndex]} ${currentTime.getDate()}, ${currentTime.getFullYear()}`
}
day.innerText = currentDay();
time.innerText = currentTime();
date.innerText = currentDate();

const getData = async (e) => {
    e.preventDefault();
    if (inputCity.value == "") {
        cityField.innerText = "Please enter proper city name";
        outputStatus.style.display = "none";
    }
    else {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const parsedData = await response.json();
            outputStatus.style.display = "inline-flex";
            cityField.innerText = `${parsedData.name}, ${parsedData.sys.country}`;
            currentTemp.innerHTML = `${parsedData.main.temp} &deg;C`;

            const tempMood = parsedData.weather[0].main;
            if (tempMood == "Clear") {
                currentStatus.innerHTML = "<i class='fas fa-sun' style='color:yellow'></i>";
            }
            else if (tempMood == "Clouds") {
                currentStatus.innerHTML = "<i class='fas fa-cloud' style='color:white'></i>";
            }
            else if (tempMood == "Rain") {
                currentStatus.innerHTML = "<i class='fas fa-cloud-rain' style='color:lightblue'></i>";
            }
            else {
                currentStatus.innerHTML = "<i class='fas fa-sun' style='color:yellow'></i>";
            }
            inputCity.value = "";
        }
        catch {
            cityField.innerText = "Invalid city name";
            outputStatus.style.display = "none";
        }
    }
}
subBtn.addEventListener("click", getData);