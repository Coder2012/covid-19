import React, { useState } from 'react'
import { useStore } from 'effector-react'
import { countries as countryList } from './api/store'
import { casesByCountry as casesList } from './api/store'
import { fetchCases } from './api/effects'
import { LineChart } from './components/LineChart'
import './App.css'

const Status = () => {
  const cases = useStore(casesList)
  return cases
    .map(({ Date: date, Cases }, index) => (
      <section key={`${index}:${date}`}>
        <p>{new Date(date).toDateString()}</p>
        <p>Deaths: {Cases}</p>
      </section>
    ))
    .slice(cases.length - 1)
}

const Loading = () => {
  const loading = useStore(fetchCases.pending)
  return (
    <div className={loading ? 'show-loader' : 'hide-loader'}>
      <svg width="120" height="30" xmlns="http://www.w3.org/2000/svg" fill="#fff">
        <circle cx="15" cy="15" r="15">
          <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="15" r="9" fillOpacity=".3">
          <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" from=".5" to=".5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" />
        </circle>
        <circle cx="105" cy="15" r="15">
          <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

function App() {
  const cases = useStore(casesList)
  const [country, setCountry] = useState('')
  const [countryLabel, setCountryLabel] = useState('Choose country')
  const countries = useStore(countryList)

  const optionItems = [...countries]
    .sort((a, b) => a.Country.localeCompare(b.Country))
    .map((country, index) => (
      <option key={index + country.Slug} value={country.Slug}>
        {country.Country}
      </option>
    ))

  const update = ({ value, selectedIndex, options }) => {
    setCountry(value)
    setCountryLabel(options[selectedIndex].text)
    fetchCases(value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{countryLabel}</p>
        <select className="App-select" value={country} onChange={event => update(event.target)}>
          {optionItems}
        </select>
      </header>
      <section className="App-content">
        <LineChart cases={cases} />
        <Status />
      </section>
      <footer className="App-footer">
        <p>Neil Brown - 2020</p>
        <Loading />
      </footer>
    </div>
  )
}

export default App
