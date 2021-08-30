const K = "KELVIN"
const C = "CELCIUS";
const F = "FAHRENHEIT";
const button = document.querySelector("button");
const img = document.querySelector("img");
const input = document.querySelector("input");
const tempPara = document.querySelector("#temp");
const weatherPara = document.querySelector("#weather");
const header = document.querySelector("#weather-message");
let timePassed = 0;
const time = document.querySelector('#time');
const tempUnitsInput = document.querySelectorAll('.tempSelector');
const tempUnitsArr = [...tempUnitsInput];
const resultDiv = document.querySelector('#result');

button.addEventListener("click",()=>{
    let tempValue ="";
    tempUnitsArr.forEach(element => {
        if(element.checked)
        tempValue=element.value;
    });
    var start = window.performance.now();
 
    // task starts
    getAPI(input.value,tempValue);
    // task ends
    
    var end = window.performance.now();
    timePassed = end - start;
    time.textContent = `Data retrieved in: ${timePassed} ms`;
})

async function getAPI(location,tempUnit){    
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1befe19e51fbd156de9827eb7086ec09`);    
        if(!response.ok){
            throw new Error(response.statusText);
        }  
        const responseData = await response.json();
        tempPara.textContent = `temperature is: ${getTemperature(responseData.main,tempUnit).getFeelsTemp()} ${tempUnit}`;
        getWeatherIcon(responseData.weather[0].icon);
        weatherPara.textContent = `current weather: ${responseData.weather[0].description}`
        header.textContent = `Current weather for ${responseData.name} `;
        resultDiv.classList.remove('hidden'); 
             
    } catch (error) {
        header.textContent = `City ${error.message}`;
    }
}

function getTemperature(responseData,tempUnits){
    const KELVIN = 273.15;
    switch(tempUnits){
        case "C":
            tempUnits = C;
            break;
        case "F":
            tempUnits = F;
            break;
    }
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