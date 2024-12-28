import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
export default client;
