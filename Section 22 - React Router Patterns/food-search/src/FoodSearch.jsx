import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FoodSearch = (props) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className='FoodSearch'>
      <h1>Search for a Food!</h1>
      <input
        type='text'
        placeholder='Search for a food'
        value={query}
        onChange={handleChange}
      />
      <Link to={`/food/${query}`}>Go!</Link>
    </div>
  );
};

export default FoodSearch;
