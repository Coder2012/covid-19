import React from 'react'
import { Chart } from 'react-charts'
import styles from './index.css'

export const LineChart = ({ cases }) => {
  console.log(styles)
  let chartData = []

  if (cases.length === 0) {
    chartData = [
      [0, 1],
      [1, 2],
      [2, 4],
      [3, 2],
      [4, 7],
    ]
  } else {
    chartData = cases.map(({ Cases }, index) => {
      return [index, Cases]
    })
  }

  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: chartData,
      },
      // {
      //   label: 'Series 2',
      //   data: [
      //     [0, 0],
      //     [1, 100],
      //     [2, 1000],
      //     [3, 2000],
      //     [5, 3000],
      //     [6, 3500],
      //     [7, 3700],
      //     [8, 3800],
      //     [9, 3850],
      //   ],
      // },
    ],
    [chartData]
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <div
      style={{
        width: '100%',
        height: '300px',
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )
}
