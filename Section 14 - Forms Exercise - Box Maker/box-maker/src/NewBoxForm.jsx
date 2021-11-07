import React from 'react';
import './NewBoxForm.css';
import { v4 as uuid } from 'uuid';

class NewBoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'red', width: 100, height: 100 };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.createBox({
      ...this.state,
      id: uuid(),
    });

    // Reset inputs to be blank
    this.setState({ color: '', width: '', height: '' });
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className='NewBoxForm'>
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor='color'>Color</label>
          <input
            type='text'
            id='color'
            name='color'
            value={this.state.color}
            onChange={this.handleOnChange}
          />

          <label htmlFor='width'>Width</label>
          <input
            type='number'
            id='width'
            name='width'
            value={this.state.width}
            onChange={this.handleOnChange}
          />

          <label htmlFor='height'>Height</label>
          <input
            type='number'
            id='height'
            name='height'
            value={this.state.height}
            onChange={this.handleOnChange}
          />

          <button>Add a New Box!</button>
        </form>
      </div>
    );
  }
}

export default NewBoxForm;
