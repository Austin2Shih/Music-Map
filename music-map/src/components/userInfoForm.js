import React, { useState } from 'react'
import { Stack, Autocomplete, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { updateUser as updateUserMutation} from '../graphql/mutations';
import useCurrentUser from '../hooks/getCurrentUser';
// import { useState, useEffect } from 'react';
// import { test_publishable, test_secret } from '../config'
// import Radar from 'radar-sdk-js';

import Feed from './feed';

// Radar.initialize(test_secret)

const cities = ["Davis", "Sacramento", "San Francisco", "San Jose", "Los Angeles", "Fremont", "San Diego", "Irvine", "Oakland", "Palo Alto", "test city"]

const UserInfoForm = () => {
  const [value, setValue] = useState()
  const [updateUser, { data, loading, error }] = useMutation(updateUserMutation)
  const user = useCurrentUser()

  return (
    <>
      <div className='autocomplete'>
        <Stack spacing={2} width='250px'>
          <Autocomplete
            id="place search"
            options={cities}
            onChange={(event, newValue) => {
              setValue(newValue)
              updateUser({ 
                variables: {
                    id: user.id,
                    city: newValue,
                    location: newValue
                }
              })
            
              if (loading) return 'Submitting...'
              if (error) return `Submission error! ${error.message}`
            }}
            renderInput={(params) => <TextField {...params} label='Search for a place' />}
          />
        </Stack>
        <Feed value={value} />
      </div>
      <style>{`
        .autocomplete {
          display: flex;
          flex-direction: row;
          justify-content: center;
          height: 80%;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}

export default UserInfoForm;