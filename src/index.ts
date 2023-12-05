import express, { Express, Request, Response } from "express";
import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
dotenv.config();

/**
 * Query: is the root of all queries that can be asked of the GraphQL server.
 * It's mandatory to have at least one type Query in the schema.
 * This is something like get request in REST.
 *
 * Mutation: is the root of all mutations that can be executed against the GraphQL server.
 * This is something like post, put, delete request in REST.
 *
 * '!': means that the field is required, else it is optional.
 */
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    firstName: String!
    lastName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const app = new ApolloServer({ typeDefs });

app.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
