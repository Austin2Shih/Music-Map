
function refreshAccessToken(id, refresh_token) {
    var details = {
      'client_id' : process.env.CLIENT_ID,
      'client_secret' : process.env.CLIENT_SECRET,
      'refresh_token': refresh_token,
      'grant_type': 'refresh_token'
    };
  
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body : formBody
    }).then(async (res) => {
      const data = await res.json();
      await db('users').update({access_token: data.access_token}).where({id})
    })
  }
  
  async function getCurrentSong(id, access_token, refresh_token) {
    return await fetch("https://api.spotify.com/v1/me/player?market=US", {
        headers: {
          Authorization: "Bearer " + access_token,
        }
    }).then(async (res) => {
        console.log(res)
        if (res.status == 401) {
            // refresh_token
            if (refresh_token != null) {
              refreshAccessToken(id, refresh_token);
              return await getCurrentSong();
            } else {
              return null;
            }
        } else if (res.status == 204) {
            return null;
        } else {
            const data = await res.json();
            console.log(data.item);
            return data.item.name;
        }
    })
  }
  
  function toRad(Value) {
    return Value * Math.PI / 180;
  }
  function haversine(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }
  
  async function getClosestUsers(id) {
  
    user = await db('users').where({id});
    
    validUsers = await db('users').whereNotNull('longitude');
    validUsers.sort((a, b) => {
      dista = haversine(user.latitude, user.longitude, a.latitude, a.longitude);
      distb = haversine(user.latitude, user.longitude, b.latitude, b.longitude);
      console.log(dista)
      console.log(distb)
      return distb - dista;
      
    })
    return validUsers;
  }
  
  export const UserResolvers = {
    User: {
      current_song: async (user) => {
        if (user.access_token === null) {
          const dummyName = `Song# ${Math.floor(Math.random() * 10000)}`;
          return dummyName;
        } else {
          const song = await getCurrentSong(user.id, user.access_token, user.refresh_token);
          return song;
        }
      }
    }, 
    Query: {
      findUser: async (_, { id }, { dataSources }) => {
        const user = await db('users').where({id}).first();
        return user? user: null;
      },
      getUsers: async () => {
        res = await db('users');
        console.log(res)
        return res;
      },
      getClosestUsers: async (_, { id }, { dataSources }) => {
        return await getClosestUsers(id)
      },
    },
    Mutation: {
      updateUser: async (_, { id, name, city, latitude, longitude, access_token, refresh_token }, { dataSources }) => {
        const user =  await db('users').where({id}).first();
        console.log(user)
        if (user) {
          await db('users').update({id, name, city, latitude, longitude, access_token, refresh_token}).where({id})
        } else {
          await db('users').insert({id, id, name, city, latitude, longitude, access_token, refresh_token})
        }
        return await db('users').where({id}).first();
  
      },
      createUser: async (_, { id, name, city, latitude, longitude, access_token, refresh_token }, { dataSources }) => {
        await db('users').insert({id, name, city, latitude, longitude, access_token, refresh_token})
        return await db('users').where({ id }).first();
      },
      deleteUser: async (_, { id }, { dataSources }) => {
        return await db('users').where({ id }).del();
      },
    }
  }