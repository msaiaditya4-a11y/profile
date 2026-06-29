const apiKey = "4a8e85d21c8f719d360b23ddd27b432b";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

async function getWeather(city){

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response=await fetch(url);
        const data=await response.json();

        if(data.cod!=200){

            document.querySelector(".weather").style.display="none";
            document.getElementById("error").style.display="block";
            document.getElementById("error").innerHTML=data.message;

            return;

        }

        document.getElementById("error").style.display="none";
        document.querySelector(".weather").style.display="block";

        document.getElementById("cityName").innerHTML=data.name;

        document.getElementById("temperature").innerHTML=
        Math.round(data.main.temp)+"°C";

        document.getElementById("description").innerHTML=
        data.weather[0].description.toUpperCase();

        document.getElementById("feelsLike").innerHTML=
        Math.round(data.main.feels_like)+"°C";

        document.getElementById("humidity").innerHTML=
        data.main.humidity+"%";

        document.getElementById("wind").innerHTML=
        data.wind.speed+" km/h";

        document.getElementById("pressure").innerHTML=
        data.main.pressure+" hPa";

        document.getElementById("country").innerHTML=
        data.sys.country;

        document.getElementById("weatherIcon").src=
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        const sunrise=new Date(data.sys.sunrise*1000);

        const sunset=new Date(data.sys.sunset*1000);

        document.getElementById("sunrise").innerHTML=
        sunrise.toLocaleTimeString([],{
            hour:'2-digit',
            minute:'2-digit'
        });

        document.getElementById("sunset").innerHTML=
        sunset.toLocaleTimeString([],{
            hour:'2-digit',
            minute:'2-digit'
        });

    }

    catch(error){

        console.log(error);

        document.querySelector(".weather").style.display="none";

        document.getElementById("error").style.display="block";

        document.getElementById("error").innerHTML=
        "Unable to fetch weather data.";

    }

}

searchBtn.addEventListener("click",()=>{

    if(cityInput.value.trim()==""){

        alert("Please enter a city name.");

        return;

    }

    getWeather(cityInput.value.trim());

});

cityInput.addEventListener("keyup",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});

// Default city

getWeather("Hyderabad");