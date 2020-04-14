import React, { useState, useEffect } from 'react'
import { useStore } from 'effector-react'

import ZingChart from 'zingchart-react'
import 'zingchart-react/dist/modules/zingchart-depth.min.js'
import { MultiSelect } from 'react-sm-select'
import 'react-sm-select/dist/styles.css'

import { Menu } from './components/Menu'
import { ReactComponent as Loader } from './components/icons/loader.svg'

import { countryList, fetchCountries } from './services/countries'
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

const menuItems = [
  {
    id: 'confirmed',
    label: 'Confirmed',
  },
  {
    id: 'recovered',
    label: 'Recovered',
  },
  {
    id: 'deaths',
    label: 'Deaths',
  },
]

const menuDefaultId = menuItems[2].id

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
  const [selectedCategory, setSelectedCategory] = useState(menuDefaultId)

  const [selectedCountries, setSelectedCountries] = useState(['united-kingdom', 'italy'])
  const [chartData, setChartData] = useState(config)

  useEffect(() => {
    selectedCountries.map((country) => fetchCases(country, selectedCategory))
  }, [selectedCountries, selectedCategory])

  useEffect(() => {
    setChartData({
      ...config,
      series: selectedCountries.map((it) => ({ values: (cases[selectedCategory] || {})[it], text: it })),
    })
  }, [selectedCountries, selectedCategory, cases])

  return (
    <div className="App">
      <header className="App-header">
        <MultiSelect id="country-list" enableSearch mode={'tags'} options={countries} value={selectedCountries} onChange={setSelectedCountries} />
      </header>
      <section className="App-content">
        <Menu data={menuItems} selectedId={selectedCategory} onChange={setSelectedCategory}/>
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
