import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getClosestUsers } from '../graphql/mutations.js';
const MINUTE_MS = 10000;

const Feed = ({value}) => {
  const [useGetClosestUsers, { data, loading, error }] = useMutation(getClosestUsers);

  useEffect(() => {
    const interval = setInterval(() => {
      useGetClosestUsers({
        variables: {
          city: value
        }
      });
    }, MINUTE_MS);
    useGetClosestUsers({
      variables: {
        city: value
      }
    });
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [value])

  return (
    <>
      <div className='list-wrapper'>
          {data && data.getClosestUsers.map((item, i) => (
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
          width: 360px;
          background-color: var(--background-secondary);
          border: 1px solid var(--text-primary);
          border-radius: 1rem;
          max-height: 100%;
          overflow: scroll;
        }

        .list-wrapper div {
          padding: 0.2rem;
        }
      `}</style>
    </>
  )
}

export default Feed;