import React, { useState, useEffect } from 'react'
import ZingChart from 'zingchart-react'
import 'zingchart-react/dist/modules/zingchart-depth.min.js';
import { useStore } from 'effector-react'
import { MultiSelect } from 'react-sm-select'
import { countryList, cases, ui, fetchCases, deaths } from './api/store'
import 'react-sm-select/dist/styles.css'
import './App.css'

const Loading = () => {
  const { loading } = useStore(ui)
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
const config = {
  type: 'line',
  series: [{}],
}

function App() {
  const d = useStore(deaths)
  const [chartConfig, setChartConfig] = useState(config)
  const context = {setChartConfig}
  const [selectedCountries, setSelectedCountries] = useState(['united-kingdom', 'italy'])

  useEffect(() => {
    console.log('render')
  }, [(d.spain || []).length])

  // useEffect(() => {
  //   cases.watch(state => {
  //     // console.log(state)
  //     context.setChartConfig({
  //       ...config,
  //       series: selectedCountries.map((countryName) => ({ values: (state['deaths'][countryName] || []).map(({ Cases }) => Cases) })),
  //     })
  //   })
  // }, [])

  // console.log(JSON.stringify(chartConfig.series))

  const countries = useStore(countryList)

  const options = [...countries].sort((a, b) => a.Country.localeCompare(b.Country)).map(({ Slug, Country }) => ({ value: Slug, label: Country }))

  const update = (countries) => {
    setSelectedCountries(countries)
    countries.map((country) => fetchCases(country))
  }

  return (
    <div className="App">
      <p>HERE:{(d.spain || []).length}</p>
      <header className="App-header">
        <MultiSelect id="country-list" enableSearch mode={'tags'} options={options} value={selectedCountries} onChange={update} />
      </header>
      <section className="App-content">
        <ZingChart key={Date.now()} data={chartConfig} series={chartConfig.series} />
      </section>
      <footer className="App-footer">
        <p>Neil Brown - 2020</p>
        <Loading />
      </footer>
    </div>
  )
}

export default App
