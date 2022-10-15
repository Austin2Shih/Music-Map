import './App.css';
import Feed from './components/feed'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Feed></Feed>
        <div>hello</div>
      </div>
    </ApolloProvider>
  );
}

export default App;
