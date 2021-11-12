import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DogList.css';

const DogList = (props) => {
  return (
    <div className='DogList'>
      <h1 className='display-2 text-center my-5'>Our Dogs!</h1>

      <div className='row'>
        {props.dogs.map((dog) => (
          <div key={dog.name} className='DogList__dog col-lg-4 text-center'>
            <img src={dog.src} alt={dog.name} />
            <h3>
              <Link className='underline' to={`/dogs/${dog.name}`}>
                {dog.name}{' '}
              </Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogList;
