import React, { useReducer, useState } from 'react';
import FilterButton from './components/reducer-hook/FilterButton';
import Form from './components/reducer-hook/Form';
import Task from './components/reducer-hook/Task';
import { taskReducer } from './components/reducer-hook/taskReducer';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function AppReducer({ tasksProps }) {
  const [filter, setFilter] = useState('All');
  const [tasks, dispatch] = useReducer(taskReducer, tasksProps);

  const taskNoun = tasks.length > 1 ? 'tasks' : 'task';
  const headingText = `${tasks.length} ${taskNoun} remaining`;

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Task
        key={task.id}
        name={task.name}
        id={task.id}
        completed={task.completed}
        dispatch={dispatch}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
      numberTasks={tasks.filter(FILTER_MAP[name]).length}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form dispatch={dispatch} />

      <div className="filters btn-group stack-exception">{filterList}</div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
