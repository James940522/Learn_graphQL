import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Movie {
    id: Int!
    name: String!
    rating: Int!
  }

  type Chat {
    id: Int!
    writer: String!
    description: String!
  }

  type Person {
    id: Int!
    name: String!
    position: String!
  }

  type Query {
    movies: [Movie!]!
    movie(id: Int!): Movie
    chatting: [Chat]!
    person: [Person]!
  }

  type Mutation {
    addMovie(name: String!, rating: Int!): Movie!
    write(writer: String!, description: String!): String!
    addPerson(name: String!, position: String!): Person!
  }

  type Subscription {
    newChat: Chat
  }
`;

export default typeDefs;
