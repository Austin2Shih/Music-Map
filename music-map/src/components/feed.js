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
      <div className='list-wrapper'>
        <ul>
          {data.getClosestUsers.map((item) => (
            <li>{item.name} from {item.city} is listening to {item.current_song}!</li>
          ))}
        </ul>
      </div>
      <style>{`
        .list-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: fit-content;
          background-color: var(--background-secondary);
          border: 1px solid var(--text-primary);
          border-radius: 1rem;
          margin-top: 3rem;
          padding-right: 2rem;
        }

        .list-wrapper ul {
          list-style: none;
          text-align: left;
        }

        .list-wrapper ul li {
          padding: 0.5rem;
        }
      `}</style>
    </>
  )
}

export default Feed;