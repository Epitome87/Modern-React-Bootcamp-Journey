import React from 'react';
import './NewTodoForm.css';
import { v4 as uuid } from 'uuid';

class NewTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: '' };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnSubmit(event) {
    event.preventDefault();

    // Add a Todo with this input text to TodoList
    this.props.addTodo({ ...this.state, id: uuid(), isCompleted: false });

    // Reset form inputs
    this.setState({ task: '' });
  }

  render() {
    return (
      <form className='NewTodoForm' onSubmit={this.handleOnSubmit}>
        <label htmlFor='task'>Task</label>
        <input
          type='text'
          name='task'
          id='task'
          value={this.state.task}
          onChange={this.handleOnChange}
        />
        <button>Add Todo</button>
      </form>
    ); 
  }
}
export default NewTodoForm;
