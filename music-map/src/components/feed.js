import React from 'react'
import { useQuery } from '@apollo/client';
import { getClosestUsers } from '../graphql/queries.js';

const Feed = () => {
  const { data, loading, error } = useQuery(getClosestUsers, {
    variables: {city: 'Davis, CA'}
  });

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <div className='test'>
          {JSON.stringify(data)}
      </div>
      <style>{`
        .test {
        }
      `}</style>
    </>
  )
}

export default Feed;