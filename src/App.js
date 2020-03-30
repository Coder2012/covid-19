import React, { useEffect, useState } from 'react'
import { useStore, useList } from 'effector-react'

import './App.css'

import { countries as countryList } from './api/store'
import { confirmedByCountry as confirmedList } from './api/store'
import { fetchConfirmed } from './api/effects'

function App() {
  const [country, setCountry] = useState('United Kingdom')

  useEffect(() => {
    console.log(`set country ${country}`)
    fetchConfirmed(country)
  }, [country])

  const countries = useStore(countryList)
  const confirmed = useStore(confirmedList)

  console.log(confirmed.length)

  const optionItems = countries.map((country, index) => (
    <option key={index + country.Slug} value={country.Slug}>
      {country.Country}
    </option>
  ))

  const list = useList(confirmedList, ({ Date, Cases }, index) => (
    <li>
      [{index}] Date: {Date} <span>{Cases}</span>
    </li>
  ))

  return (
    <div className="App">
      <header className="App-header">
        <p>{country}</p>
        <select value={country} onChange={e => setCountry(e.target.value)}>
          {optionItems}
        </select>
      </header>
      <ul>{list}</ul>
    </div>
  )
}

export default App
