import { useParams } from 'react-router-dom';

const Meal = (props) => {
  const { foodName, drinkName } = useParams();
  return (
    <div className='Meals'>
      Meal consists of: {foodName} and {drinkName}
      <img
        src={`https://source.unsplash.com/800x800/?${foodName}`}
        alt={foodName}
      />
      <img
        src={`https://source.unsplash.com/800x800/?${drinkName}`}
        alt={drinkName}
      />
    </div>
  );
};

export default Meal;
