import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: new HttpLink({
    credentials: 'include',
    uri: 'https://warm-falls-14185.herokuapp.com/graphql',
  }),
  cache: new InMemoryCache(),
})
