import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export const Menu = ({ data, selectedId, onChange }) => {
  return (
    <nav className={classNames(styles.menu)}>
      {data.map(({ id, label }) => (
        <button
          className={classNames(styles[`menu-button`], { [styles[`menu-button--selected`]]: selectedId === id })}
          type="button"
          key={id}
          id={id}
          onClick={(e) => onChange(e.currentTarget.id)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
