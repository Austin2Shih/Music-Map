import React from 'react'
import useFetch from '../hooks/useFetch'
import { test_publishable, test_secret } from '../config'
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';

const UserInfoForm = () => {
  // const {data, loading, error} = useFetch("https://api.radar.io/v1/search/autocomplete?query=brooklyn+roasting", {
  //   method: 'GET',
  //   body: JSON.stringify({
  //       Authorization: test_secret,
  //   }),
  //   headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //   },
  // })

  const data = fetch("https://api.radar.io/v1/search/autocomplete?query=brooklyn+roasting", {
    method: 'GET',
    headers: {
        Authorization: test_secret,
    },
  }).then(async (res) => {
    console.log(await res.json())
  })

  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];
  // if (loading) return "loading..."
  // if (error) return error
  return (
    <>
      <div>
        <form>
          <label for="name">name</label>
          <input type="text" id="name" name="name"></input>
        </form>
        <select>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="meat">Meat</option>
        </select>
        {
            data && JSON.stringify(data)
        }
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </div>
      <style>{`
      
      `}</style>
    </>
  )
}

export default UserInfoForm;