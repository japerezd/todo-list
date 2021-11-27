import React from 'react'

export default function FilterButton({name, isPressed, setFilter, numberTasks}) {
    return (
        <button type="button" className="btn toggle-btn" aria-pressed={isPressed} onClick={() => setFilter(name)}>
          <span className="visually-hidden">Show </span>
          <span>{name}({numberTasks})</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    )
}
