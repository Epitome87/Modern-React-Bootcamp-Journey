import React, { useContext } from 'react';
import './RuleRow.css';
import { gameContext } from '../contexts/GameContext';

const RuleRow = (props) => {
  const { score, name, doScore, description } = props;
  const { isRolling } = useContext(gameContext);
  const disabled = props.score !== undefined;

  return (
    <tr
      className={`RuleRow RuleRow-${disabled ? 'disabled' : 'active'}`}
      onClick={disabled || isRolling ? null : doScore}
      style={isRolling ? { cursor: 'not-allowed' } : {}}
    >
      <td className='RuleRow-name'>{name}</td>
      <td className='RuleRow-score'>{disabled ? score : description}</td>
    </tr>
  );
};

export default RuleRow;
