import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function PaletteMetaForm({ palettes, handleSubmitNewPalette }) {
  const [open, setOpen] = React.useState(false);

  const [newPaletteName, setNewPaletteName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <ValidatorForm
            onSubmit={() => handleSubmitNewPalette(newPaletteName)}
          >
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
            />
            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
