import React, { useState } from 'react';
import { createContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import LandingPage from './components/landingPage';
import Feed from './components/feed';
import useCurrentUser from './hooks/getCurrentUser';
import UserInfoForm from './components/userInfoForm';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


export const AuthContext = createContext({
    value: false,
    setAuth: () => {}
});

function App() {
  const user = useCurrentUser();
  const [auth, setAuth] = useState(user ? true : false);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{auth, setAuth}}>
        <div className="App">
          <LandingPage></LandingPage>
          <Feed></Feed>
          <UserInfoForm></UserInfoForm>
        </div>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;