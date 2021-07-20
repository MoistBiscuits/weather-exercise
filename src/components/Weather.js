import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styling/weather.scss';

const Weather = () => {
  const [weatherParis, updateWeatherParis] = useState(null)
  const [weatherLondon, updateWeatherLondon] = useState([])
  const [chosenCity, setCity] = useState(null)

  const SearchBox = (props) => {
    return(
      <input type="search"
      className='search'
      id='city-input'
      placeholder={props.placeholder}
      // onClick={() => setCity(document.getElementsByClassName("city-input").value)}
      ></input>
    )
  }
  
  const SearchButton = (props) => {
    return(
      <input type="button" value="Submit" onClick={() => setCity(document.getElementById("city-input").value)}></input>
    )
  }
  

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=London&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
      for (let i = 0; i < 5; i++) {
        updateWeatherLondon(prevArray => [...prevArray, (res.data.list[i].weather[0].description)])
      }
    })

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
      updateWeatherParis(res.data.weather[0].description)
    })
  }, [])

  return (
    <div data-testid="weather" className="weather">
      <SearchBox placeholder="Enter the Country"/>
      <SearchButton></SearchButton>
      Weather:
      <br />
      The current weather in London is: {weatherLondon[0]}, {weatherLondon[1]}, {weatherLondon[2]}
      <br />
      The current weather in Paris is: {weatherParis}
      <br />
      The current weather in {chosenCity} is: {weatherParis}
    </div>
  );
}


/*
<input type="text" id="city-input"></input>
<input type="button" value="Submit" onClick={() => updateSearchedCity(document.getElementById("city-input").value)}></input>
*/

export default Weather;
