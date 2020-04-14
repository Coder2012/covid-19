import React, { useState, useEffect } from 'react'
import { useStore } from 'effector-react'

import ZingChart from 'zingchart-react'
import 'zingchart-react/dist/modules/zingchart-depth.min.js'
import { MultiSelect } from 'react-sm-select'
import 'react-sm-select/dist/styles.css'

import { months, scaleX, menuItems, menuDefaultId, config } from './components/constants'
import { Menu } from './components/Menu'
import { ReactComponent as Loader } from './components/icons/loader.svg'

import { countryList, fetchCountries } from './services/countries'
import { loading } from './services/ui'
import { casesList, fetchCases } from './services/cases'

import './App.css'
import { useCallback } from 'react'

const Loading = () => {
  const isLoading = useStore(loading)
  return (
    <div className={isLoading ? 'show-loader' : 'hide-loader'}>
      <Loader />
    </div>
  )
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

  const parseSeries = useCallback((country, cases, category) => {
    const values = cases[category]?.[country]?.map(({ Cases }) => Cases)
    const text = countries.find(({ value }) => value === country)?.label

    return { values, text }
  }, [countries])

  useEffect(() => {
    const [first = []] = Object.values(cases[selectedCategory])
    const labels = first.map((it) => {
      const [, month, date] = it.Date.split('T')[0].split('-')
      return `${date} ${months[month - 1]}`
    })

    setChartData({
      ...config,
      series: selectedCountries.map((country) => parseSeries(country, cases, selectedCategory)),
      scaleX: {
        ...scaleX,
        labels,
      },
    })
  }, [parseSeries, selectedCountries, selectedCategory, cases])

  return (
    <div className="App">
      <header className="App-header">
        <MultiSelect id="country-list" enableSearch mode={'tags'} options={countries} value={selectedCountries} onChange={setSelectedCountries} />
      </header>
      <section className="App-content">
        <Menu data={menuItems} selectedId={selectedCategory} onChange={setSelectedCategory} />
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
