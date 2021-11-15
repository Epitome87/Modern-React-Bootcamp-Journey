import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

function DraggableColorList({ colors, handleDelete }) {
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, idx) => (
        <DraggableColorBox
          index={idx} // for drag and drop
          key={color.name}
          color={color.color}
          name={color.name}
          handleDelete={() => handleDelete(color.name)}
        />
      ))}
    </div>
  );
}

export default SortableContainer(DraggableColorList);
