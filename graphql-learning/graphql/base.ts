import { createSchema, createYoga, PubSub } from "graphql-yoga";

const yoga = createYoga({
    schema: createSchema({
        typeDefs: `
        type Query {
            hello: String,
            posts(query: String): [Posts!]!
        }
        type Posts {
                id: ID!
                name: String!
            }
        `,
        resolvers: {
            Query: {
                hello: (parent, args, ctx, info) => { console.log(ctx,); return 'im working fine here' }
            }
        }
    }),
    logging: true,
});



export default yoga;