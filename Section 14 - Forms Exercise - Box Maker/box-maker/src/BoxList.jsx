import React from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm';
import './BoxList.css';

class BoxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boxes: [] };
    this.createBox = this.createBox.bind(this);
    this.removeBox = this.removeBox.bind(this);
  }

  createBox({ color, width, height, id }) {
    const newBox = { color, width, height, id };
    this.setState({ boxes: [...this.state.boxes, newBox] });
  }

  removeBox(id) {
    const filteredBoxes = this.state.boxes.filter((box) => {
      return box.id !== id;
    });

    console.log('REMOVING', filteredBoxes);
    this.setState({ boxes: [...filteredBoxes] });
  }

  render() {
    return (
      <div className='BoxList'>
        <h1 className='BoxList__title'>Box Maker Thingy</h1>
        <NewBoxForm createBox={this.createBox} />
        <div className='BoxList__boxes'>
          {this.state.boxes.map((box) => {
            return (
              <Box
                key={box.id}
                id={box.id}
                color={box.color}
                width={box.width}
                height={box.height}
                removeBox={this.removeBox}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default BoxList;
