/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { gql } from '@apollo/client';

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

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

// const client = ...

client
    .query({
        query: gql`
        query MyQuery {
  saving_target {
    id
    saved_value
    target_name
    target_value
  }
}

      `,
    })
    .then(result => console.warn(result));



AppRegistry.registerComponent(appName, () => App);
