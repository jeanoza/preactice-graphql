import express, { Express, Request, Response } from "express";
import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
dotenv.config();

//#region mock data
const tweets = [
  {
    id: "1",
    text: "Hello World",
  },
  {
    id: "2",
    text: "Bye World",
  },
];
//#endregion

//#region GraphQL Models
/**
 * Query: is the root of all queries that can be asked of the GraphQL server.
 * It's mandatory to have at least one type Query in the schema.
 * This is something like get request in REST.
 *
 * Mutation: is the root of all mutations that can be executed against the GraphQL server.
 * This is something like post, put, delete request in REST.
 *
 * '!': means that the field is required, else it is nullable.
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
    author: User
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
//#endregion

//#region Dtos
interface GetTweet {
  id: string;
}

interface PostTweet {
  text: string;
  userId: string;
}
interface DeleteTweet extends GetTweet {}
//#endregion

//#region Resolvers
const resolvers = {
  Query: {
    allTweets: () => {
      return tweets;
    },
    tweet: (root: unknown, { id }: GetTweet) => {
      return tweets.find((tweet) => tweet.id === id);
    },
  },
  Mutation: {
    postTweet: (_: unknown, { text, userId }: PostTweet) => {
      const tweet = {
        id: String(tweets.length + 1),
        text,
      };
      tweets.push(tweet);
      return tweet;
    },
    deleteTweet: (_: unknown, { id }: DeleteTweet) => {
      const tweetIndex = tweets.findIndex((tweet) => tweet.id === id);

      if (tweetIndex === -1) return false;
      tweets.splice(tweetIndex, 1);
      return true;
    },
  },
};
//#endregion

const app = new ApolloServer({ typeDefs, resolvers });

app.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
