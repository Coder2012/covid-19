import React, { useState, useEffect } from 'react'
import { useStore } from 'effector-react'

import ZingChart from 'zingchart-react'
import 'zingchart-react/dist/modules/zingchart-depth.min.js'
import { MultiSelect } from 'react-sm-select'
import 'react-sm-select/dist/styles.css'

import { Menu } from './components/Menu'
import { ReactComponent as Loader } from './components/icons/loader.svg'

import { countryList, fetchCountries } from './services/countries'
import { category } from './services/menu'
import { loading } from './services/ui'
import { casesList, fetchCases } from './services/cases'

import './App.css'

const Loading = () => {
  const isLoading = useStore(loading)
  return (
    <div className={isLoading ? 'show-loader' : 'hide-loader'}>
      <Loader />
    </div>
  )
}

const config = {
  type: 'line',
  legend: {
    x: '60px',
    y: '70px',
  },
  series: [],
}

function App() {
  useEffect(() => {
    fetchCountries()
  }, [])

  const countries = useStore(countryList)
  const cases = useStore(casesList)
  const selectedCategory = useStore(category)

  const [selectedCountries, setSelectedCountries] = useState(['united-kingdom', 'italy'])
  const [chartData, setChartData] = useState(config);

  useEffect(() => {
    setChartData({
      ...config,
      series: selectedCountries.map(it => ({ values: (cases[selectedCategory] || {})[it], text: it })),
    })
  }, [cases]) // eslint-disable-line

  const updateCountries = countries => {
    setSelectedCountries(countries)
    countries.map(country => fetchCases(country, selectedCategory))
  }

  return (
    <div className="App">
      <header className="App-header">
        <MultiSelect id="country-list" enableSearch mode={'tags'} options={countries} value={selectedCountries} onChange={updateCountries} />
      </header>
      <section className="App-content">
        <Menu />
        <ZingChart data={chartData} />
      </section>
      <footer className="App-footer">
        <p>Neil Brown - 2020</p>
        <Loading />
      </footer>
    </div>
  )
}

export default App
