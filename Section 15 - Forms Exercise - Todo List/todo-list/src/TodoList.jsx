import React from 'react';
import './TodoList.css';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  addTodo(newTodo) {
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  removeTodo(id) {
    const filteredTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: [...filteredTodos] });
  }

  editTodo(id, updatedTask) {
    const editedTodo = { id, task: updatedTask };

    const editedTodos = this.state.todos.map((todo) => {
      return todo.id === id ? editedTodo : todo;
    });

    this.setState({ todos: editedTodos });
  }

  toggleCompletion(id) {
    const editedTodos = this.state.todos.map((todo) => {
      return todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo;
    });

    this.setState({ todos: editedTodos });
  }

  render() {
    return (
      <div className='TodoList'>
        <h1>Todo List <span>A Simple React Todo List</span></h1>
        <NewTodoForm addTodo={this.addTodo} />
        <ul className='TodoList__todos'>
          {this.state.todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                isCompleted={todo.isCompleted}
                removeTodo={this.removeTodo}
                editTodo={this.editTodo}
                toggleTodo={this.toggleCompletion}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
