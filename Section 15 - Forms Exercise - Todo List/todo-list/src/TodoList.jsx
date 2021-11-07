import React from 'react';
import './TodoList.css';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { v4 as uuid } from 'uuid';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  addTodo(task) {
    const newTodo = { task, id: uuid() };
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  removeTodo(id) {
    const filteredTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: [...filteredTodos] });
  }

  render() {
    return (
      <div className='TodoList'>
        <NewTodoForm addTodo={this.addTodo} />
        <div className='TodoList__todos'>
          {this.state.todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                removeTodo={this.removeTodo}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default TodoList;
