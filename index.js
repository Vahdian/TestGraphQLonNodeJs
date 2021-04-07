const express = require("express");
const app = express();
const userData = require("./MOCK_DATA.json")
const { graphqlHTTP } = require("express-graphql")
const graphql = require("graphql")

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000, ()=> console.log ("Server listening on port 3000"))