import React, { useEffect } from 'react'
import { useState } from 'react';
import { test_publishable, test_secret } from '../config'
import { Stack, Autocomplete, TextField, Box } from '@mui/material';
import Radar from 'radar-sdk-js';

Radar.initialize(test_secret)

const UserInfoForm = () => {
  const [places, setPlaces] = useState([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {

    loadPlaces()
  }, []);

  const loadPlaces = async () => {
    console.log(inputValue)
    Radar.autocomplete({
      query: inputValue,
      limit: 10
    }, function(err, result) {
      if (!err) {
        console.log(result)
        setPlaces(result.addresses)
      }
    })
    .then()
    console.log(places)
  }

  return (
    <>
      <div>
        <Stack spacing={2} width='250px'>
          <Autocomplete
            id="place search"
            getOptionLabel={(places) => {
              if (places.city != null) {
                return places.city
              } else {
                return places.country
              }
            }}
            options={places}
            // value={value}
            inputValue={inputValue}
            onInputChange={e => {
              setInputValue(() => e.target.value)
              loadPlaces()
            }}
            // sx={{width: 300}}
            // isOptionEqualToValue={(option, value) => (
            //   option.addresses.city === value.addresses.city
            // )}
            renderOption={(props, places) => (
              <Box component="li" {...props} key={places.formattedAddress}>
                {places.city}
              </Box>
            )}
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