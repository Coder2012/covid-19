import React, { useState, useEffect, createRef } from 'react'
import { useStore } from 'effector-react'

import ZingChart from 'zingchart-react'
import 'zingchart-react/dist/modules/zingchart-depth.min.js'
import { MultiSelect } from 'react-sm-select'
import 'react-sm-select/dist/styles.css'

import { Menu } from './components/Menu'

import { countryList, fetchCountries } from './services/countries'
import { category } from './services/menu'
import { loading } from './services/ui'
import { casesList, fetchCases } from './services/cases'

import './App.css'

category.watch(category => {
  console.log(`category = ${category}`)
  // updateCases(category)
})

const Loading = () => {
  const isLoading = useStore(loading)
  return (
    <div className={isLoading ? 'show-loader' : 'hide-loader'}>
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

  const chart = createRef()
  const countries = useStore(countryList)
  const selectedCategory = useStore(category)

  const [selectedCountries, setSelectedCountries] = useState(['united-kingdom', 'italy'])

  casesList.watch((list = []) => {
    if (chart.current) {
      console.log('updating watch list')
      chart.current.setseriesdata({
        data: selectedCountries.map(it => ({ values: (list[selectedCategory] || {})[it], text: it })),
      })
    }
  })

  const updateCountries = countries => {
    setSelectedCountries(countries)
    updateCases()
  }

  const updateCases = () => {
    selectedCountries.map(country => fetchCases(country, selectedCategory))
  }

  return (
    <div className="App">
      <header className="App-header">
        <MultiSelect id="country-list" enableSearch mode={'tags'} options={countries} value={selectedCountries} onChange={updateCountries} />
      </header>
      <section className="App-content">
        <Menu />
        <ZingChart id={'zchart'} ref={chart} data={config} />
      </section>
      <footer className="App-footer">
        <p>Neil Brown - 2020</p>
        <Loading />
      </footer>
    </div>
  )
}

export default App
