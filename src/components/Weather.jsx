import React, { useEffect, useState } from 'react'
import './Weather.css'
//import searchIcon from '../assets/searchIcon.jpg'
// magnify
import { FaMagnifyingGlass } from "react-icons/fa6";
//sun
import { WiDaySunny } from "react-icons/wi";
//cloud icon 
import { FaCloudSun } from "react-icons/fa6";
//drizzle
import { WiNightAltShowers } from "react-icons/wi";
//rain
import { FaCloudSunRain } from "react-icons/fa6";
//snow
import { FaRegSnowflake } from "react-icons/fa6";
//Wind
import { WiCloudyWindy } from "react-icons/wi";
//humidity
import { WiSandstorm } from "react-icons/wi";




const Weather = () => {

  const [weatherDAta,setWeatherData ]=useState(false);

  const allIcons ={
    "01d": WiDaySunny,
    "01n": clear_icon,
    "02d":cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": WiNightAltShowers,
    "04n":drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,

  }
          const search = async(city)=>{
            try {
                const url =`https://api.openweathermap.org/data/2.5/weather?q=
                ${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                const icon =allIcons[data.weather[0].icon] || clear_icon;
                setWeatherData({
                  humidity: data.main.humidity,
                  windSpeed: data.wind.speed,
                  temperature: Math.floor(data.main.temp),
                  location: data.name,
                  icon: icon
                })
            } catch (error) {
                
            }
          }
           useEffect(()=>{
            search("New York");
           },[])




  return (
    <div className='Weather'> 
      <div className="search-bar">
        <input type="text" placeholder='search' />
        
        <FaMagnifyingGlass  color='#fff' />
       
      </div>
      <div className='weather-icon'>
      <WiDaySunny size={60} color='#fff' />
      
      </div>
      <p className='Temperature'>{weatherDAta.temperature} °C </p>
      <p className='Location'>{weatherDAta.location}</p>
      <div className="weather-data">
        <div className="col">
            <WiSandstorm size={50} color='#fff' />
        <div>
            <p>{weatherDAta.humidity} %</p>
            <span>Humidity</span>
        </div>
        </div>
        <div className="col"><WiCloudyWindy size={50} color='#fff' />
        <div>
            <p>{weatherDAta.windSpeed} km/h</p>
            <span>Wind Speed</span>
        </div>
        </div>
        </div>
      

    </div>
  )
}

export default Weather
