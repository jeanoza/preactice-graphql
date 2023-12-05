## Simple Apollo Server using Graphql + NodeJS

### Why GraphQL not RestAPI?

- `over-fetching` : in GraphQL client can request only data needed

- `undef-fetching`: in GraphQL client send only one request for event data joined by multiple table.

  cf: in Restfull API, sometimes client should send more than 2 requests to get data he want.(when there is a other table to join for example)
