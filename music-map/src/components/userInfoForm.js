import React from 'react'
import { Stack, Autocomplete, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { updateUser } from '../graphql/mutations';
import useCurrentUser from '../hooks/getCurrentUser';
// import { useState, useEffect } from 'react';
// import { test_publishable, test_secret } from '../config'
// import Radar from 'radar-sdk-js';

// Radar.initialize(test_secret)

const cities = ["Davis", "Sacramento", "San Francisco", "San Jose", "Los Angeles", "Fremont", "San Diego", "Irvine", "Oakland", "Palo Alto"]

const UserInfoForm = () => {
  // const [places, setPlaces] = useState([])
  // const [inputValue, setInputValue] = useState("")
  const [useUpdateUser, { data, loading, error }] = useMutation(updateUser)
  const user = useCurrentUser()

  // useEffect(() => {
  //   loadPlaces()
  // }, []);

  // const loadPlaces = async () => {
  //   console.log(inputValue)
  //   Radar.autocomplete({
  //     query: inputValue,
  //     limit: 10
  //   }, function(err, result) {
  //     if (!err) {
  //       console.log(result)
  //       setPlaces(result.addresses)
  //     }
  //   })
  //   console.log(places)
  // }

  return (
    <>
      <div>
        <Stack spacing={2} width='250px'>
          <Autocomplete
            id="place search"
            // getOptionLabel={(places) => {
            //   if (places.city != null) {
            //     return places.city
            //   } else {
            //     return places.country
            //   }
            // }}
            // options={places}
            // inputValue={inputValue}
            // onInputChange={e => {
            //   setInputValue(() => e.target.value)
            //   loadPlaces()
            // }}
            // renderOption={(props, places) => (
            //   <Box component="li" {...props} key={places.formattedAddress}>
            //     {places.city}
            //   </Box>
            // )}
            options={cities}
            onChange={(event, newValue) => {
              useUpdateUser({ 
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
      </div>
      <style>{`
      
      `}</style>
    </>
  )
}

export default UserInfoForm;