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
          {data.getClosestUsers.map((item, i) => (
            <div key={i}>
              <h3>{item.name}</h3>
              <p>{item.current_song}</p>
            </div>
          ))}
      </div>
      <style>{`
        .list-wrapper {
          display: flex;
          flex-direction: column;
          width: fit-content;
          background-color: var(--background-secondary);
          border: 1px solid var(--text-primary);
          border-radius: 1rem;
          margin-top: 3rem;
          max-height: 50%;
          overflow: scroll;
        }

        .list-wrapper div {
          padding: 0.5rem 5rem 0.5rem 5rem;
        }
      `}</style>
    </>
  )
}

export default Feed;