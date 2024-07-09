import { ApolloClient, InMemoryCache } from '@apollo/client';



const client = new ApolloClient({
  uri: 'http://localhost:8000/api/graphql/', // URL of the Django GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
