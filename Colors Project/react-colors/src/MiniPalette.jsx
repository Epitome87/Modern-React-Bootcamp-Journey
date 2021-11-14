// import React from 'react';
// import { makeStyles } from '@mui/styles';
// // import styled from 'styled-components';
// import styled from '@emotion/styled';

// const MiniPalette = (props) => {
//   const StyledDiv = styled.div`
//     background-color: pink;
//     border: 5px solid blue;

//     & h1 {
//       color: yellow;
//     }

//     & p {
//       font-size: 2rem;
//     }

//     .colors {
//       font-size: 20rem;
//     }
//   `;

//   return (
//     <StyledDiv>
//       <div className='colors'>LOL</div>
//     </StyledDiv>
//   );
// };

// export default MiniPalette;

import React from 'react';
import { withStyles } from '@mui/styles';

const styles = {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      curors: 'pointer',
    },
  },
  colors: {
    backgroundColor: 'grey',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative',
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
  },
};

function MiniPalette(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.colors}></div>
      <h5 className={classes.title}>
        {props.paletteName}
        <span className={classes.emoji}>{props.emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
