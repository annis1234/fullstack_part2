import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryView = ({country}) => {

    const [weather, setWeather] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY
    const lat = country.latlng[0]
    const lon = country.latlng[1]

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        .then(response =>{
          setWeather(response.data)
        })
      }) 

    
    if (!weather) {
        return null
    }

    return(
        
        <div>
           <h1>{country.name.common}</h1>
            capital {country.capital}<br></br>
            area {country.area}

            <h3>languages:</h3>

            <ul>{Object.values(country.languages).map(language => (
                <li key={language}>{language}</li>
                ))}
            </ul>
            <img src = {country.flags.png} alt =''/>
            <h3>Weather in {country.capital}</h3>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src ={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt =''></img>
            <p>wind {weather.wind.speed} m/s</p>
            

        </div>
           
    )
}

export default CountryView
