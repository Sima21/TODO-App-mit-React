import React, { useState } from 'react';
import './App.css'; // Importiere die externe CSS-Datei

// TodoList Component
const TodoList = ({ todos, onDelete, onToggle }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => onToggle(index)} 
          />
          {todo.text} 
          <button onClick={() => onDelete(index)}>Löschen</button>
        </li>
      ))}
    </ul>
  );
};

// DeleteTodo Component
const DeleteTodo = ({ onDelete }) => {
  const [deleteIndex, setDeleteIndex] = useState('');

  const handleDelete = () => {
    if (deleteIndex.trim() !== '') {
      onDelete(parseInt(deleteIndex, 10));
      setDeleteIndex('');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={deleteIndex} 
        onChange={(e) => setDeleteIndex(e.target.value)} 
        placeholder="Index des zu löschenden To-Dos eingeben" 
      />
      <button onClick={handleDelete}>Löschen</button>
    </div>
  );
};

// Main TodoApp Component
const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="todo-app-container"> {/* Verwende eine äußere Container-Div mit einer CSS-Klasse */}
      <h1>To-Do Liste</h1>
      <div className="todo-components-container"> {/* Verwende eine Container-Div für die Komponenten */}
        <TodoList todos={todos} onDelete={handleDeleteTodo} onToggle={handleToggleTodo} />
        <AddTodo onAdd={handleAddTodo} />
        <br /> {/* Platzhalter für Abstand */}
        <DeleteTodo onDelete={handleDeleteTodo} />
      </div>
    </div>
  );
};

// AddTodo Component
const AddTodo = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      onAdd({ text: newTodo, completed: false });
      setNewTodo('');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Neues To-Do eingeben" 
      />
      <button onClick={handleAddTodo}>Hinzufügen</button>
    </div>
  );
};

export default TodoApp;
