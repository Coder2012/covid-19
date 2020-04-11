import React from 'react'
import { useStore } from 'effector-react'
import { category, setCategory } from '../../services/menu'

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

export const Menu = props => {
  const selectedId = useStore(category)
  return (
    <nav>
      {data.map(({ id, label }) => (
        <button className={`menu-button ${selectedId === id ? 'selected' : ''}`} type="button" key={id} id={id} onClick={e => setCategory(e.currentTarget.id)}>
          {label}
        </button>
      ))}
    </nav>
  )
}
