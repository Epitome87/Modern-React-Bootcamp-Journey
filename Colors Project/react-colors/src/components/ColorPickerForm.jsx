import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'; // Form Validation
import '../styles/ColorPickerFormStyles.css';

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

  useEffect(() => {}, []);

  // TODO: Make these validation rules be added once? Yet that seems to break things.
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

  // Called when the form is submitted: Sets color name to the form's input
  const handleOnSubmit = () => {
    addNewColor({ name: newColorName, color: currentColor });
    setNewColorName('');
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <ChromePicker
        className='ColorPicker'
        color={currentColor}
        onChangeComplete={handleChangeComplete}
        style={{ width: '100% !important', marginTop: '2rem !important' }}
      />
      <ValidatorForm
        onSubmit={handleOnSubmit}
        onError={(errors) => console.log(errors)}
        instantValidate={false}
      >
        <TextValidator
          className='ColorPicker__colorNameInput'
          label='Color Name'
          onChange={handleColorNameValidatorChange}
          variant='filled'
          margin='normal'
          name='newColorName'
          value={newColorName}
          //   placeholder='Color Name'
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'Color name is required',
            'Color name must be unique',
            'Color already used',
          ]}
          style={{ width: '100%', height: '70px' }}
        />
        <Button
          className='ColorPicker__addColor'
          variant='contained'
          type='Submit'
          color='primary'
          disabled={paletteIsFull}
          style={{
            backgroundColor: paletteIsFull ? 'grey' : currentColor,
            width: '100%',
            padding: '1rem',
            marginTop: '1rem',
            fontSize: '2rem',
          }}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
