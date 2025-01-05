
  // gets the info of the state and city which then finds and return the weather 
  function getWeather() {
      const apiKey = '352dc0c123052ab18a975c32661eedeb';
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
  
      if (!city) {
          alert('Please enter a city');
          return;
      }
      if (!state) {
          alert('Please enter a state');
          return;
      }
  
      const weatherURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},USA&limit=5&appid=${apiKey}`;
  
      fetch(weatherURL)
          .then(response => response.json())
          .then(data => {
              if (data.length === 0) {
                  alert('No data found for the specified city and state.');
                  return;
              }
  
              const { lon, lat } = data[0];
              console.log('Longitude:', lon);
              console.log('Latitude:', lat);
              findingInfo(lon, lat);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              alert('An error occurred while fetching the data.');
          });
  }
  
  function findingInfo(longitude, latitude) {
      const apiKey = '352dc0c123052ab18a975c32661eedeb';
      const weatherURL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  
      // https://api.openweathermap.org/data/2.5/weather?lat=36.0726355&lon=-79.7919754&appid=352dc0c123052ab18a975c32661eedeb&units=imperial
  
      fetch(weatherURL2)
          .then(res => res.json())
          .then(data => {
              const { temp, humidity } = data.main;
              const windSpeed = data.wind.speed;
              const description = (data.weather && data.weather.length > 0) ? data.weather[0].description : "no description is available";
              const icon = (data.weather && data.weather.length > 0) ? data.weather[0].icon : null;
              console.log('temp: ', temp);
              console.log('hum: ', humidity);
              console.log('description:', description);
              console.log("Icon Code", icon);
              console.log("wind speed: ", windSpeed);
              displayWeather(temp, humidity, description, icon, windSpeed);
          })
          .catch(error => {
              console.error('Error fetching weather data:', error); // Added console logging
              alert('An error occurred while fetching the data.');
          });
  }
  
  function displayWeather(temperature, humidity, description, icon, wind) {
      const weatherIcon = document.getElementById("weather_icon");
      weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      weatherIcon.alt = "weather Icon";
      
      const page = document.getElementById('weather');
      page.innerText = `${Math.floor(temperature)}°F`;
  
      const humidit = document.getElementById("humidty");
      humidit.innerText = `${humidity}%`;
  
      const weather = document.getElementById("description");
  
      weather.innerText = `${description}`;

    
      const speed = document.getElementById("wind");
      speed.innerText = `${wind} MPH`;

    
  }
      
  
      
  
  
  
      
      
  
  
  
  
  
  
  
  // TESTing 
  // var array =[];
  // fetch("https://api.openweathermap.org/geo/1.0/direct?q=greensboro,NC,USA&limit=5&appid=352dc0c123052ab18a975c32661eedeb")
  // .then(res => res.json())
  // .then(data => array.push(data.name))
  // console.log(array)
  