import React, { useState } from 'react'
import { useStore } from 'effector-react'
import { countries as countryList } from './api/store'
import { casesByCountry as casesList } from './api/store'
import { fetchCases } from './api/effects'
import { LineChart } from './components/LineChart'
import './App.css'

const List = () => {
  const cases = useStore(casesList)
  const list = cases
    .map(({ Date: date, Cases }, index) => (
      <li key={`${index}:${date}`}>
        {new Date(date).toDateString()} <span>{Cases}</span>
      </li>
    ))
    .slice(cases.length - 1)

  return <ul>{list}</ul>
}

const Loading = () => {
  const loading = useStore(fetchCases.pending)
  return <div>{loading ? 'Loading...' : 'Load complete'}</div>
}

function App() {

  const cases = useStore(casesList)
  const [country, setCountry] = useState('united-kingdom')
  const countries = useStore(countryList)

  const optionItems = [...countries]
    .sort((a, b) => a.Country.localeCompare(b.Country))
    .map((country, index) => (
      <option key={index + country.Slug} value={country.Slug}>
        {country.Country}
      </option>
    ))

  const update = id => {
    setCountry(id)
    fetchCases(id)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Selected: {country}</p>
        <select value={country} onChange={e => update(e.target.value)}>
          {optionItems}
        </select>
      </header>
      <LineChart cases={cases} />
      <List />
      <Loading />
    </div>
  )
}

export default App
