import { useParams } from 'react-router-dom';

const Food = (props) => {
  const { name } = useParams();

  return (
    <div className='Food'>
      Food: {name}
      <img src={`https://source.unsplash.com/800x800/?${name}`} alt={name} />
    </div>
  );
};

export default Food;
