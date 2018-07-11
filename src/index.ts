import { ApolloServer, gql } from 'apollo-server';
import { Prisma } from './generated/prisma';
import { Context } from './utils';

const typeDefs = gql`
  type Todo{
    id: ID!
    text: String!
  }

  type Query{
    todos: [Todo!]!
  }

  type Mutation{
    addTodo(text: String!): Todo
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      todos: (parent, args, ctx: Context, info) => ctx.db.query.todoes({}),
    },
    Mutation: {
      addTodo: (parent, args, ctx: Context, info) => ctx.db.mutation.createTodo({ data: { text: args.text } })
    }
  },
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: process.env.PRISMA_ENDPOINT,
      debug: true,
    })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});