import { useEffect, useState } from 'react'
import PersonService from './services/PersonService'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Form from './components/PersonForm'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const handleFilterChange= (event) => {
  setFilter(event.target.value)
}

const Notification = ({message}) => {
  if (message == null) {
    return null
  }
  return (
    <div className ="notification">
      {message}
    </div>
  )
}

const ErrorMessage = ({errorMessage}) => {
  if (errorMessage == null) {
    return null
  }
  return(
    <div className ="error">
      {errorMessage}
    </div>
  )
}

const PersonsToShow = filter
? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) 
: persons


  useEffect(() => {
    PersonService
    .getAll()
    .then(persons =>{
      setPersons(persons)
    })
  }, [])


  const removePerson = id => {
    const name = persons.find((person) => person.id === id).name

    if (window.confirm(`Delete ${name}?`)) { 
      PersonService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      setMessage(`${name} was removed`)
      setTimeout(() => {
        setMessage(null)}, 5000)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject= {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        PersonService.replace(existingPerson.id, personObject)
        .then((response) => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
        })
        .catch(error => {
          setErrorMessage(`${newName} was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)},5000)
        })
      }
      else {
          setMessage(`${newName}'s number was replaced`)
          setTimeout(() => {
            setMessage(null)}, 5000)
          
      }
    }
      
    else {

    PersonService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response))
      })
      setMessage(`${newName} was added`)
      setTimeout(() => {
        setMessage(null)}, 5000)
  }
  setNewName('')
  setNewNumber('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message}/>
      <ErrorMessage errorMessage = {errorMessage}/>
      <Filter filter = {filter} onFilterChange = {handleFilterChange}/>
      <h2>add a new</h2>
      <Form addPerson = {addPerson} name = {newName} onNameChange = {handleNameChange}
                  number = {newNumber} onNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
      <Persons filter = {PersonsToShow} removePerson={removePerson}
      />
      </ul>
    </div>
  )

}

export default App