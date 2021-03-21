import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '../node_modules/@apollo/client';
import {setContext} from '../node_modules/@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://htf.hasura.app/v1/graphql',
});



const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
      'LFpo6Qa35yULCnCfqj8iwXO6r1NIMyHftLXprNuSksV0CHQbhCrS4DjTC0JZBx5S';
  // return the headers to the context so httpLink can read them
  return {
      headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret':
              'LFpo6Qa35yULCnCfqj8iwXO6r1NIMyHftLXprNuSksV0CHQbhCrS4DjTC0JZBx5S',
      },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
