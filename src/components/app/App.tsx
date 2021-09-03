import React from 'react';
import { useState, useEffect, useRef } from 'react';
import TodoList from '../../todoList/todoList';
import { ITodo } from "../types/data"
import './App.scss';

const App: React.FC = () => {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const addTodo = () => {
    if (input) {
      setTodos([...todos, {
        id: Date.now(),
        title: input,
        complete: false,
      }])
      setInput('')
    }
    console.log(todos)
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  })
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value)
  }
  const handleEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const removeTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        complete: !todo.complete
      }
    }))
  }

  return (
    <div className="App">
      <div>
        <input value={input} onChange={handleChange} onKeyDown={handleEnter} ref={inputRef} />
        <button onClick={addTodo}>Add </button>
      </div>
      <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
