const apiKey = '8d6454a89dff871786a0307b0dbebbee'
async function fetchWeatherData(city) {   // making  a async function to fetch the weather data
    try {
        const response = await fetch(  //the fetch method will provide you a promise , so using await so that we wait for the promise to fullfill
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}` // api link
        );

        if (!response.ok) {   // handling the error , if promise response is acceptable , it will throw the error below
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();  // converting response into json file so that we can do further operations in javascript
        console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.visibility);
        updateWeatherUI(data);
        clothing(data);
        medicalprotection(data);
    } catch (error) {  // using catch keyword for otherwise condtion , promise status is rejected
        console.error(error);
    }
}

const cityElement = document.querySelector(".city"); // accessing html element from html file using their classes by using queryselector method,and storing them using const keyword
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");
const land = document.querySelector(".groundlevel");
const press = document.querySelector(".pressure");
const protection = document.querySelector(".med");


const cloth = document.querySelector(".clothing");

function updateWeatherUI(data) {      // update weather data by accessing different section of apis and storing them into the accessed classes of html and changing their content using text content method
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;
    descriptionText.textContent = data.weather[0].description;
    land.innerHTML = `${data.main.grnd_level}ft`;
    press.innerHTML = `${data.main.pressure}hpa`;
    
    const currentDate = new Date();  // updating the new date
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
   
}
function medicalprotection(data) {
 
    if(data.weather[0].description =="haze") {
       protection.innerHTML="mask on";
    }
    else{
       protection.innerHTML="mask off";
    }
   }
function clothing(data) {    // making a function of clothing recommendation using else if ladder
    if(data.main.temp < 0) {  
        cloth.innerHTML="Grab insulated jackets or parka";
    }
    else if(data.main.temp>0 && data.main.temp<10) {
        cloth.innerHTML="grab heavy coat or jacket"
    }
    else if(data.main.temp>10 && data.main.temp<20) {
        cloth.innerHTML="grab to light-weight jacket or sweater";
    }
    else if(data.main.temp>20 && data.main.temp<25) {
        cloth.innerHTML="can have T-shirts or long -sleeve shirts";
    }
    else if(data.main.temp>25 && data.main.temp<30) {
        cloth.innerHTML="A day for short sleeve shirts or tanks tops";
    }
    else{
        cloth.innerHTML="A hydration pack or water bottle";
    }
    
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {  //adding an event listener which is submit action on form clas
    e.preventDefault();

    const city = inputElement.value;  //accessing the input value i.e the city
    if (city !== "") {
        fetchWeatherData(city);
        
    }
});

function getWeatherIconName(weatherCondition) { //update the weather icon using getweathericonname function and arguement of weather condition
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}
