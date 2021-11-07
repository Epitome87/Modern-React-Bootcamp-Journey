import React from 'react';
import './Todo.css';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
  }

  handleRemoveTodo() {
    this.props.removeTodo(this.props.id);
  }

  render() {
    return (
      <div className='Todo'>
        <p>{this.props.task}</p>
        <button onClick={this.handleRemoveTodo}>X</button>
      </div>
    );
  }
}

export default Todo;
