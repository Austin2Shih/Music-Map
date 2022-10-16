import React from 'react'
import { useQuery } from '@apollo/client';
import { getClosestUsers } from '../graphql/queries.js';

const Feed = ({value}) => {
  const { data, loading, error } = useQuery(getClosestUsers, {
    variables: {city: value}
  });

  if (loading) return 'Submitting...';
  if (error) return 'No city selected!';

  return (
    <>
      <div className='test'>
        <ul>
          {data.getClosestUsers.map((item) => (
            <li>{item.name} from {item.city} is listening to {item.current_song}!</li>
          ))}
        </ul>
      </div>
      <style>{`
        .test ul {
          list-style: none;
          text-align: left;
        }
      `}</style>
    </>
  )
}

export default Feed;