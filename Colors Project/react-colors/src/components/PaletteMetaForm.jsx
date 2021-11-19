import React, { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';

function PaletteMetaForm({ palettes, handleSubmitNewPalette, handleHideForm }) {
  const [newPaletteName, setNewPaletteName] = useState('');
  const [formStage, setFormStage] = useState('paletteName');

  const handleClose = () => {
    // Why doesn't Colt have to setOpen to false?
    // setOpen(false);

    handleHideForm();
  };

  const handlePaletteNameValidatorChange = (event) => {
    setNewPaletteName(event.target.value);
  };

  // Validation for Palette Name:
  ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
    return palettes.every(
      (palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
    );
  });

  const handleShowEmojiPicker = () => {
    setFormStage('emoji');
  };

  const handleSelectEmoji = (emoji) => {
    const newPalette = { paletteName: newPaletteName, emoji: emoji.native };
    setFormStage('');
    handleSubmitNewPalette(newPalette);
  };

  return (
    <div>
      <Dialog open={formStage === 'emoji'} onClose={handleClose}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker onSelect={handleSelectEmoji} title='Pick a Palette Emoji' />
      </Dialog>

      <Dialog open={formStage === 'paletteName'} onClose={handleClose}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={handleShowEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette! Make sure the
              name is unique.
            </DialogContentText>

            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              name={'newPaletteName'}
              onChange={handlePaletteNameValidatorChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Palette name is required',
                'Palette name already exists',
              ]}
              fullWidth
              margin='normal'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
