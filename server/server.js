const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const cors = require('cors');

const { getPeople, getPersonalDetails } = require('./resolvers/peopleResolvers');

const app = express();

app.use(cors());

const typeDefs = gql`
  type People {
      name: String
      height: String
      mass: String
      gender: String
      homeworld: String
  }
    
  type PeopleQueryResponse {
      count: Int
      results: [People]
  }
    
  type Query {
    people(page: Int, searchText: String): PeopleQueryResponse
    personDetail(personId: Int): People
  }
`;


const resolvers = {
    Query: {
        people: getPeople,
        personDetail: getPersonalDetails
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})



const port = process.env.PORT || 5000;


server.start().then(res => {
    server.applyMiddleware({ app, path: '/' });
    app.listen({ port }, () =>
        console.log(`Server started on Port: ${port}`)
    );
})