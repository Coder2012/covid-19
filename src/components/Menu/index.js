import React from 'react'
import { useStore } from 'effector-react'
import classNames from 'classnames'
import { category, setCategory } from '../../services/menu'

import styles  from './index.module.scss'

const data = [
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

export const Menu = (props) => {
  const selectedId = useStore(category)
  return (
    <nav className={classNames(styles.menu)}>
      {data.map(({ id, label }) => (
        <button
          className={classNames(styles[`menu-button`], {[styles[`menu-button--selected`]]: selectedId === id})}
          type="button"
          key={id}
          id={id}
          onClick={(e) => setCategory(e.currentTarget.id)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
