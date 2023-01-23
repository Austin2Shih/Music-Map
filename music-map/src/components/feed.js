import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { getClosestUsers as getClosestUsersQuery} from '../graphql/queries';
const MINUTE_MS = 1000;

const Feed = ({value}) => {
  if (!value) value = "San Jose"
  const [feedData, updateFeedData] = useState();
  const [getClosestUsers, { loading, error, data }] = useLazyQuery(getClosestUsersQuery);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await getClosestUsers({
        variables: {
          city: value
        }, 
        fetchPolicy: 'no-cache'
      })
      updateFeedData(res.data)
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <>
      <div className='list-wrapper'>
          {feedData && feedData.getClosestUsers.map((item, i) => (
            <div key={i}>
              <h3>{item.name || item.id}</h3>
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