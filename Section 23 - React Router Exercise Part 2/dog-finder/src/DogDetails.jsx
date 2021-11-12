import { useParams } from 'react-router-dom';
import './DogDetails.css';
import { Link, Navigate } from 'react-router-dom';

const DogDetails = (props) => {
  const params = useParams();

  // Find the dog requested in the URL
  const searchedDog = props.dogs.find(
    (dog) => dog.name.toLowerCase() === params.dogName.toLowerCase()
  );

  if (!searchedDog) {
    return <Navigate to='/dogs' />;
  }

  return (
    <div className='DogDetails row justify-content-center mt-5'>
      <div className='col-11 col-lg-5'>
        <div className='DogDetails__card card'>
          <img
            className='card-img-top img-fluid img-thumbnail mx-auto'
            src={searchedDog.src}
            alt={searchedDog.name}
          />
          {/* Card Body */}
          <div className='card-body'>
            <h2 className='card-title'>{searchedDog.name}</h2>
            <h4 className='card-subtitle text-muted'>
              {searchedDog.age} years old
            </h4>
          </div>

          {/* List (of facts) */}
          <ul className='list-group list-group-flush'>
            {searchedDog.facts.map((fact, i) => (
              <li className='list-group-item' key={`fact-${i}`}>
                {fact}
              </li>
            ))}
          </ul>

          {/* Another Card Body */}
          <div className='card-body'>
            <Link to='/dogs' className='btn btn-info'>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
