document.addEventListener("DOMContentLoaded", function () {
    // Replace 'YOUR_API_KEY' with your actual API key
    let apiKey = 'YOUR_API_KEY';
     let apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=49.993500,36.230385&apikey=${apiKey}`;
    let currentday=27;
    let currentmonth=12;
    let currentyear=2023;
    let data;
    const day1 = document.getElementById("day1");
    const day2 = document.getElementById("day2");
    const day3 = document.getElementById("day3");
    const day4 = document.getElementById("day4");
    const position = document.getElementById("position");
    const textday = document.querySelector('#textday');

    var today = new Date();
      
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    var dayAfterTomm = new Date();
    dayAfterTomm.setDate(dayAfterTomm.getDate() + 2);
    
    var afterOverMorrow = new Date();
    afterOverMorrow.setDate(afterOverMorrow.getDate() + 3);
    
    day1.innerHTML =('<p>' + formatDate(today) + '</p>');
    day2.innerHTML =('<p>' + formatDate(tomorrow) + '</p>');
    day3.innerHTML =('<p>' + formatDate(dayAfterTomm) + '</p>');
    day4.innerHTML =('<p>' + formatDate(afterOverMorrow) + '</p>');


   

        // Function to make the API request
    async function fetchAndUpdateWeather(apiUrl) {
         try {
             const response = await fetch(apiUrl);
             data = await response.json();
             displayWeatherInfo(data, currentday);
         } catch (error) {
            console.error("Error fetching weather data:", error);
         }
    }


    document.getElementById("btn1").onclick = function(){currentday = 27;
        currentmonth = 12; 
        currentyear = 2023;
        console.log(currentday);
        displayWeatherInfo(data, currentday);};


    document.getElementById("btn2").onclick = function(){currentday = 28;
        currentmonth = 12; 
        currentyear = 2023;
        console.log(currentday);
        displayWeatherInfo(data, currentday);};


    document.getElementById("btn3").onclick = function(){currentday = 29;
        currentmonth = 12; 
        currentyear = 2023;
        console.log(currentday);
        displayWeatherInfo(data, currentday);};


    document.getElementById("btn4").onclick = function(){currentday = 30;
        currentmonth = 12; 
        currentyear = 2023;
        console.log(currentday);
        displayWeatherInfo(data, currentday);};



    // Function to display weather information
    function displayWeatherInfo(data, currentday) {
        const weatherInfoContainer = document.getElementById("weather-info");
        const weatherInfoTemp = document.getElementById("weather-temp");
        const weatherInfoHum = document.getElementById("weather-hum");
        const weatherInfoCode = document.getElementById("weather-code");
        const dayweather = [
        document.getElementById("day-weather-temp00"),
        document.getElementById("day-weather-temp02"),
        document.getElementById("day-weather-temp04"),
        document.getElementById("day-weather-temp06"),
        document.getElementById("day-weather-temp08"),
        document.getElementById("day-weather-temp10"),
        document.getElementById("day-weather-temp12"),
        document.getElementById("day-weather-temp14"),
        document.getElementById("day-weather-temp16"),
        document.getElementById("day-weather-temp18"),
        document.getElementById("day-weather-temp20"),
        document.getElementById("day-weather-temp22")
    ];

    if( currentmonth < 10 ){
        if( currentday < 10 ){
            textday.innerHTML = `   0${currentday}.0${currentmonth}.${currentyear}`;

        }else{
            textday.innerHTML = `   ${currentday}.0${currentmonth}.${currentyear}`;

        }
        
    }else {

        if( currentday < 10 ){
           textday.innerHTML = `   0${currentday}.${currentmonth}.${currentyear}`;

        }else{
            textday.innerHTML = `   ${currentday}.${currentmonth}.${currentyear}`;
            
        }

    }
        
       
        

        if (data.timelines && data.timelines.daily.length > 0 && currentday > 0) {
            let timeline;
            for(let i = 0; i < data.timelines.daily.length; i++){
                if( currentmonth < 10 ){
                    if( currentday < 10 ){
                        if(data.timelines.daily[i].time == `${currentyear}-0${currentmonth}-0${currentday}T04:00:00Z`){
                            timeline = data.timelines.daily[i];
                            break;
                        }
                    }else{
                        if(data.timelines.daily[i].time == `${currentyear}-0${currentmonth}-${currentday}T04:00:00Z`){
                            timeline = data.timelines.daily[i];
                            break;
                        }
                    }
                    
                }else {

                    if( currentday < 10 ){
                        if(data.timelines.daily[i].time == `${currentyear}-${currentmonth}-0${currentday}T04:00:00Z`){
                            timeline = data.timelines.daily[i];
                            break;
                        }
                    }else{
                        if(data.timelines.daily[i].time == `${currentyear}-${currentmonth}-${currentday}T04:00:00Z`){
                            timeline = data.timelines.daily[i];
                            break;
                        }
                    }

                }
                
                
            }
            
            const temperature = timeline.values.temperatureAvg;
            const humidity = timeline.values.humidityAvg;
            const weatherCode = timeline.values.rainIntensityAvg;

            weatherInfoTemp.innerHTML = `
                <p>Temperature: ${temperature}°C</p>
               
            `;
            weatherInfoHum.innerHTML = `
                <p>Humidity: ${humidity}%</p>

            `;
            weatherInfoCode.innerHTML = `
                <p>Chance of rain: ${weatherCode}</p>

            `;
            for ( let i = 0; i <= 22; i = i + 2 ){
                for(let j = 0; j < data.timelines.hourly.length; j++){
                    if( (i < 10) && (currentday < 10) ){
                        if(currentmonth < 10){
                            if(data.timelines.hourly[j].time == `${currentyear}-0${currentmonth}-0${currentday}T0${i}:00:00Z`){
                                timeline = data.timelines.hourly[j];
                                break;
                            }
                        }else{
                            if(data.timelines.hourly[j].time == `${currentyear}-${currentmonth}-0${currentday}T0${i}:00:00Z`){
                                timeline = data.timelines.hourly[j];
                                break;
                            }
                        }
                        
                    } else if((i < 10) && (currentday >= 10)){

                        if(currentmonth < 10){
                            if(data.timelines.hourly[j].time == `${currentyear}-0${currentmonth}-${currentday}T0${i}:00:00Z`){
                                timeline = data.timelines.hourly[j];
                                break;
                            }
                        } else {
                            if(data.timelines.hourly[j].time == `${currentyear}-${currentmonth}-${currentday}T0${i}:00:00Z`){
                                timeline = data.timelines.hourly[j];
                                break;
                            }
                        }

                    } else if((i >= 10) && (currentday < 10)){

                        if(currentmonth < 10){
                            if(data.timelines.hourly[j].time == `${currentyear}-0${currentmonth}-0${currentday}T${i}:00:00Z`){
                                timeline = data.timelines.hourly[j];
                                break;
                            }
                        } else {
                            if(data.timelines.hourly[j].time == `${currentyear}-${currentmonth}-0${currentday}T${i}:00:00Z`){
                                timeline = data.timelines.hourly[j];
                                break;
                            }
                        }
                        
                    } else if((i >= 10) && (currentday >= 10)){

                        if(currentmonth < 10){
                            if(data.timelines.hourly[j].time == `${currentyear}-0${currentmonth}-${currentday}T${i}:00:00Z`){
                                timeline = data.timelines.hourly[j];
                                break;
                            }
                        } else {
                            if(data.timelines.hourly[j].time == `${currentyear}-${currentmonth}-${currentday}T${i}:00:00Z`){
                                timeline = data.timelines.hourly[j];
                                break;
                            }
                        }
                        
                    }
                }
                // timeline = data.timelines.hourly.time["2023-12-27T14:00:00Z"];
                const temperature = timeline.values.temperature;
                if(temperature){ 
                    dayweather[(i/2)].innerHTML = `
                    <p>${i}:00<br> ${temperature}°C</p>
                `;} else{
                    dayweather[(i/2)].innerHTML = `
                    <p>${i}:00<br> Past Time</p> `;
                }
               
            }
            
        } else {
            weatherInfoContainer.innerHTML = "<p>Unable to fetch weather data</p>";
        }
    }

//Get modal element 
const modal = document.getElementById("locationModal");
    const closeModalBtn = document.getElementById("closeModal");
    const confirmLocationBtn = document.getElementById("confirmLocationBtn");

    // Add event listener to open modal when button is clicked
    const changeLocationBtn = document.getElementById("changeLocationBtn");
    changeLocationBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Add event listener to close modal when close button is clicked
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Add event listener to confirm new location and update weather
    confirmLocationBtn.addEventListener("click", function () {
        const newLatitude = document.getElementById("newLatitude").value;
        const newLongitude = document.getElementById("newLongitude").value;

        // Validate latitude and longitude inputs
        if (isValidCoordinate(newLatitude) && isValidCoordinate(newLongitude)) {
            // Update API URL with new location
            const newApiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${newLatitude},${newLongitude}&apikey=${apiKey}`;

            // Make API request with new location
            fetchAndUpdateWeather(newApiUrl);
            position.innerHTML = `<p>${newLatitude}, ${newLongitude} </p>`;
            // Close the modal
            modal.style.display = "none";
        } else {
            alert("Invalid coordinates. Please enter valid Latitude and Longitude.");
        }
    });

   // Call the function to get weather data when the page loads
    fetchAndUpdateWeather(apiUrl);
});




//Formation dates
    function formatDate(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
        var day = date.getDate().toString().padStart(2, '0');
      
        return year + '-' + month + '-' + day;
      }
      
      var today = new Date();
      
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      var dayAfterTomm = new Date();
      dayAfterTomm.setDate(dayAfterTomm.getDate() + 2);
      
      var afterOverMorrow = new Date();
      afterOverMorrow.setDate(afterOverMorrow.getDate() + 3);




// Function to check if a coordinate is valid
function isValidCoordinate(coordinate) {
    return /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/.test(coordinate);
}