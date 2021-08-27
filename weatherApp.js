const K = "KELVIN"
const C = "CELCIUS";
const F = "FAHRENHEIT";
const button = document.querySelector("button");
const img = document.querySelector("img");
const input = document.querySelector("input");
const tempPara = document.querySelector("#temp");
const weatherPara = document.querySelector("#weather");
const header = document.querySelector("#weather-message");


button.addEventListener("click",()=>{
    getAPI(input.value);
})

async function getAPI(location){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1befe19e51fbd156de9827eb7086ec09`);
    const responseData = await response.json()
    console.log(responseData);
    console.log(responseData.name)
    console.log(getTemperature(responseData.main,C).getFeelsTemp())
    console.log(responseData.weather[0].icon);
    tempPara.textContent = `temperature is: ${getTemperature(responseData.main,C).getFeelsTemp()}`;
    getWeatherIcon(responseData.weather[0].icon);
    weatherPara.textContent = `current weather: ${responseData.weather[0].description}`
    header.textContent = `Current weather for ${responseData.name} `;
}

function getTemperature(responseData,tempUnits){
    const KELVIN = 273.15;
    function getCelcius(temp){
        return temp - KELVIN;
    }
    function getFahrenheit(temp){
        return getCelcius(temp)* 9/5 + 32;
    }
    function getCurrentTemp(){
        return getTemp(responseData.temp).toFixed(2);
    }
    function getFeelsTemp(){
        return getTemp(responseData.feels_like).toFixed(2);
    }
    function getTemp(temp){
        switch(tempUnits){
            case "KELVIN":
                return temp;
                break;
            case "CELCIUS":
                return getCelcius(temp)
                break;
            case "FAHRENHEIT":
                return getFahrenheit(temp);
                break;
        }
    }
    return {    
        getCurrentTemp,   
        getFeelsTemp,

    }
}

function getWeatherIcon(data){    
    img.src = `http://openweathermap.org/img/wn/${data}@2x.png`;
}