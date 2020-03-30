import React, { useState } from 'react'
import { useStore } from 'effector-react'

import './App.css'

import { countries as countryList } from './api/store'
import { casesByCountry as casesList } from './api/store'
import { fetchCases } from './api/effects'

const List = () => {
  const cases = useStore(casesList)

  const list = cases.map(({ Date, Cases }, index) => (
    <li key={`${index}:${Date}`}>
      [{index}] Date: {Date} <span>{Cases}</span>
    </li>
  ))

  return <ul>{list}</ul>
}

function App() {
  const [country, setCountry] = useState('united-kingdom')
  const countries = useStore(countryList)

  console.log('calling me?')

  const optionItems = countries.map((country, index) => (
    <option key={index + country.Slug} value={country.Slug}>
      {country.Country}
    </option>
  ))

  const update = id => {
    console.log(`id: ${id}`)
    setCountry(id)
    fetchCases(id)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Selected: {country}</p>
        <select value={country} onChange={e => update(e.target.value)}>{optionItems}</select>
      </header>
      <List />
    </div>
  )
}

export default App
