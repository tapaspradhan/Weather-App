const inputBox=document.querySelector(".input-box")

const searchBtn=document.getElementById("searchBtn")

const weatherImage=document.querySelector(".weather-image")

const temperature=document.querySelector(".temperature")

const description=document.querySelector(".description")

const humidity=document.getElementById("humidity")

const windSpeed=document.getElementById("wind-speed")

const locationNotFound=document.querySelector(".location-not-found")

const weatherBody=document.querySelector(".weather-body")


async function checkWeather (city){
    const apiKey="0978bf2bd37e71de2eb981691ed21d3a"
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const weatherData=await fetch(`${url}`)
                        .then(response=>response.json())
                        console.log(weatherData);

    temperature.innerHTML=`${Math.round(weatherData.main.temp - 273.15)}°C`

    description.innerHTML=`${weatherData.weather[0].description}`

    humidity.innerHTML=`${Math.round(weatherData.main.humidity)}%`

    windSpeed.innerHTML=`${Math.round(weatherData.wind.speed)} Km/H`

    if (weatherData.cod===`404`) {
        locationNotFound.style.display="flex";
        weatherBody.style.display="none";
        console.log("error");
        return;
    }

    locationNotFound.style.display="none";
    weatherBody.style.display="flex";

    switch (weatherData.weather[0].main) {
        case "Clouds":
            weatherImage.src="./assests/cloud.png"
            break;
        case "Clear":
            weatherImage.src="./assests/clear.png"
            break;
        case "Rain":
            weatherImage.src="./assests/rain.png"
            break;
        case "Mist":
            weatherImage.src="./assests/mist.png"
            break;
        case "Snow":
            weatherImage.src="./assests/snow.png"
            break;
        default :
            weatherImage.src="./assests/404.png"
    }
}

searchBtn.addEventListener("click",()=>{
    checkWeather(inputBox.value)
})
