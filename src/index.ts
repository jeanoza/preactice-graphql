import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
import { Tweet, User, tweets, users } from "./mockData";
import { DeleteTweet, GetTweet, PostTweet } from "./tweet.dto";
dotenv.config();

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
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;
//#endregion

//#region Resolvers
const resolvers = {
  Query: {
    allUsers: () => {
      return users;
    },
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
        userId,
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
  User: {
    fullName: ({ firstName, lastName }: User) => {
      return `${firstName} ${lastName}`;
    },
  },
  Tweet: {
    author: ({ userId }: Tweet) => {
      return users.find((user) => user.id === userId);
    },
  },
};
//#endregion

const app = new ApolloServer({ typeDefs, resolvers });

app.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
