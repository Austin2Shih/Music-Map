import React, { useState } from 'react';
import { createContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import LandingPage from './components/landingPage';
import useCurrentUser from './hooks/getCurrentUser';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


export const AuthContext = createContext({
    value: false,
    setAuth: () => {}
});

function App() {
    const user = useCurrentUser()
    const [auth, setAuth] = useState(user ? true : false)

    return (
        <ApolloProvider client={client}>
            <AuthContext.Provider value={{auth, setAuth}}>
                <div className="App">
                    <LandingPage />
                </div>
            </AuthContext.Provider>
        </ApolloProvider>
    )
}

export default App;