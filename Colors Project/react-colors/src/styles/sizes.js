const sizes = {
  up(size) {
    const sizes = {
      sx: '575.98px',
      sm: '767.98px',
      md: '991.98px',
      lg: '119.98px',
    };

    return `@media (min-width: ${sizes[size]})`;
  },

  down(size) {
    const sizes = {
      xs: '575.98px',
      sm: '767.98px',
      md: '991.98px',
      lg: '1119.98px',
      xl: '1600px',
    };

    return `@media (max-width: ${sizes[size]})`;
  },
};

export default sizes;
