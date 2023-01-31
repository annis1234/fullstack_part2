import { useEffect, useState } from 'react'
import Country from './components/Country'
import CountryView from './components/CountryView'
import Filter from './components/Filter'
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`)
    .then(response =>{
      setCountries(response.data)    
    })
  }, []) 

  const CountriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries


  const HandleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  if (CountriesToShow.length < 10 && CountriesToShow.length !== 1) {
  return (
    <div>
      <Filter filter = {filter} onFilterChange = {HandleFilterChange}/>
      {CountriesToShow.map(country => 
     <Country key ={country.name.common} country = {country}/>)}
     </div>
      )
  } if (CountriesToShow.length === 1) {
    return (
      <div>
        <Filter filter = {filter} onFilterChange = {HandleFilterChange}/>
    
        {CountriesToShow.map(country => 
      <CountryView key = {country.name.common} country = {country}/>)}
      </div>
    )
  } else {
    return(
      <div>
        <Filter filter = {filter} onFilterChange = {HandleFilterChange}/>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

export default App