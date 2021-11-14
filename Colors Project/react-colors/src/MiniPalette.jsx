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

import { useNavigate } from 'react-router-dom';

const styles = {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',

    // colt doesn't do this
    display: 'flex',
    flexDirection: 'column',

    '&:hover': {
      cursor: 'pointer',
    },
  },
  colors: {
    backgroundColor: '#dae1e5',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.2rem 0 0', // Colt does 0
    color: 'black',
    // paddingTop: '0.5rem', // Colt does 0.5rem
    // paddingBottom: '0.5rem', // Colt doesn't set this
    fontSize: '1rem',
    position: 'relative',
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
  },
  miniColor: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-3.5px',
  },
};

function MiniPalette(props) {
  const { classes } = props;
  const navigate = useNavigate();

  const miniColorBoxes = props.colors.map((color) => {
    return (
      <div
        key={color.name}
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
      />
    );
  });

  return (
    <div
      className={classes.root}
      onClick={() => navigate(`/palette/${props.id}`)}
      //   onClick={() => props.handleClick(props.id)}
    >
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {props.paletteName}
        <span className={classes.emoji}>{props.emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
