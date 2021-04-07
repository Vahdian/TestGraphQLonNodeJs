const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLInputObjectType} = graphql;
const schema = require("./Schemas/index")

//Con userType definimos el modelo de la siguiente manera:

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true  
}))

app.listen(3000, ()=> console.log ("Server listening on port 3000"))