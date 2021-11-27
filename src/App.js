import { useState } from 'react';
import './App.css';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({ tasksProps }) {
  const [tasks, setTasks] = useState(tasksProps);
  const [filter, setFilter] = useState('All');

  const taskNoun = tasks.length !== 1 ? 'tasks' : 'task';
  const headingText = `${tasks.length} ${taskNoun} remaining`;

  const tasksList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
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

  function addTask(name) {
    const task = { id: 'todo-' + new Date().getTime(), name, completed: false };
    setTasks([...tasks, task]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName };
      }

      return task;
    });

    setTasks(editedTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form onSubmitTask={addTask} />

      <div className="filters btn-group stack-exception">{filterList}</div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasksList}
      </ul>
    </div>
  );
}

export default App;
