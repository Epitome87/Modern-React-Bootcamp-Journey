import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
// React Color
import { ChromePicker } from 'react-color';
// Form Validation
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function ColorPickerForm({ paletteIsFull, addNewColor, colors }) {
  // Color State:
  const [currentColor, setCurrentColor] = useState('teal');

  // Color Name State:
  const [newColorName, setNewColorName] = useState('');

  const handleChangeComplete = (color, event) => {
    setCurrentColor(color.hex);
  };

  // Called when the "Color Name" text validator receives new input
  const handleColorNameValidatorChange = (event) => {
    setNewColorName(event.target.value);
  };

  // TODO: Only add these validation rules once
  // Validation for New Color's Name:
  ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
    return colors.every(
      (color) => color.name.toLowerCase() !== value.toLowerCase()
    );
  });

  // Validation for New Color's...Color
  ValidatorForm.addValidationRule('isColorUnique', (value) => {
    return colors.every((color) => color.color !== currentColor);
  });

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={handleChangeComplete}
      />
      <ValidatorForm
        onSubmit={() =>
          addNewColor({ name: newColorName, color: currentColor })
        }
        onError={(errors) => console.log(errors)}
      >
        <TextValidator
          label='Color'
          onChange={handleColorNameValidatorChange}
          name='newColorName'
          value={newColorName}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'Color name is required',
            'Color name must be unique',
            'Color already used',
          ]}
        />
        <Button
          variant='contained'
          type='Submit'
          color='primary'
          disabled={paletteIsFull}
          style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
