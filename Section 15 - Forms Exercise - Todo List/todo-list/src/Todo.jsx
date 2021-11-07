import React from 'react';
import './Todo.css';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, task: this.props.task };
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleToggleCompletion = this.handleToggleCompletion.bind(this);
  }

  // When "X" (remove) button is pressed
  handleRemoveTodo() {
    this.props.removeTodo(this.props.id);
  }

  // When "Edit" button is pressed
  handleToggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  // When value of the editted todo input changes
  handleEditChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // When edit Form is submitted
  handleEditSubmit(event) {
    event.preventDefault();

    this.props.editTodo(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  }

  // When todo is clicked, toggle its Complete flag
  handleToggleCompletion() {
    // this.setState({ isComplete: !this.state.isComplete });
    this.props.toggleTodo(this.props.id);
  }

  render() {
    let renderedTodo;

    if (this.state.isEditing) {
      renderedTodo = (
        <div className='Todo'>
          <form className='Todo-edit-form' onSubmit={this.handleEditSubmit}>
            <input
              type='text'
              name='task'
              value={this.state.task}
              onChange={this.handleEditChange}
            />
            <button>Save</button>
          </form>
        </div>
      );
    } else {
      renderedTodo = (
        <li className='Todo'>
          <div
            className={`${
              this.props.isCompleted ? 'Todo-task completed' : 'Todo-task'
            }`}
            onClick={this.handleToggleCompletion}
          >
            {this.props.task}
          </div>
          <div className='Todo-buttons'>
            <button onClick={this.handleToggleEdit}>
              <i className='fas fa-pen' />
            </button>
            <button onClick={this.handleRemoveTodo}>
              <i className='fas fa-trash' />
            </button>
          </div>
        </li>
      );
    }
    return renderedTodo;
  }
}

export default Todo;
