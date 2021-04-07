const express = require("express");
const app = express();
const userData = require("./MOCK_DATA.json")
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLInputObjectType} = graphql;

//Con userType definimos el modelo de la siguiente manera:

const UserType = new GraphQLObjectType({
    name:  "User",
    fields: ()=> ({
        id: { type: GraphQLInt},
        first_name: { type: GraphQLString},
        last_name: { type: GraphQLString},
        email: { type: GraphQLString},
        gender: { type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new  GraphQLList(UserType),
            args: { id: { type: GraphQLInt}},
            //Con args.id por ejemplo accederemos a la Id
            resolve(parent, args){
                return userData
            }
        }
    }
})

//
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: { 
        createUser:{
            type: UserType,
            args: {
                first_name: { type: GraphQLString},
                last_name: { type: GraphQLString},
                email: { type: GraphQLString},
                gender: { type: GraphQLString},
            },
            resolve(parent, args){
                userData.push({id: userData.length + 1, first_name: args.first_name, last_name: args.last_name, email: args.email, gender: args.gender})
                return args
            }
        }
    }
})

const schema = new GraphQLSchema({query: RootQuery , mutation: Mutation})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true  
}))

app.listen(3000, ()=> console.log ("Server listening on port 3000"))