import { useState } from 'react'
import CountryView from "./CountryView"

const Country = ({country}) => {
    const [showCountry, setShowCountry] = useState(false)

    const handleShow = () => {
        setShowCountry(!showCountry)
    }

    if(showCountry === false) {
    return(
        <div>
           {country.name.common}
           <button onClick = {handleShow} > {showCountry ? "hide" : "show"} </button>
        </div>
           
    )
    } else {
        return(
        <div>
            <CountryView key = {country.name.common} country={country}/>
            <button onClick = {handleShow} > {showCountry ? "hide" : "show"} </button>
        </div>
    )}
}

export default Country 
