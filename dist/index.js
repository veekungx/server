"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var prisma_1 = require("./generated/prisma");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Todo{\n    id: ID!\n    text: String!\n  }\n\n  type Query{\n    todos: [Todo!]!\n  }\n\n  type Mutation{\n    addTodo(text: String!): Todo\n  }\n"], ["\n  type Todo{\n    id: ID!\n    text: String!\n  }\n\n  type Query{\n    todos: [Todo!]!\n  }\n\n  type Mutation{\n    addTodo(text: String!): Todo\n  }\n"])));
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        Query: {
            todos: function (parent, args, ctx, info) { return ctx.db.query.todoes({}); },
        },
        Mutation: {
            addTodo: function (parent, args, ctx, info) { return ctx.db.mutation.createTodo({ data: { text: args.text } }); }
        }
    },
    context: function (req) { return (__assign({}, req, { db: new prisma_1.Prisma({
            endpoint: "http://localhost:4466/tutorial/dev",
            debug: true,
        }) })); }
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var templateObject_1;
//# sourceMappingURL=index.js.map