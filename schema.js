export const typeDefs = `#graphql
  type Movie {
    id: ID!
    title: String!
    filmed: Boolean!
    year: Int!
    rating: Float
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    movies: [Movie!]!
    authors: [Author!]!
    movie(id: ID!): Movie
    author(id: ID!): Author
  }
`;
