const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma/client')

const typeDefs = `
  type Book {
    id: Int!
    title: String!
    pages: Int
    chapters: Int
  }

  type Query {
    books: [Book!]
    book(id: Int!): Book
  }
`;

const resolvers = {
  Query: {
    books: function(root, args, context, info) {
      return books;
    },
    book: (root, args, context, info) => books.find(e => e.id === args.id)
  },
  Book: {
    id: parent => parent.id,
    title: parent => parent.title,
    pages: parent => parent.pages,
    chapters: parent => parent.chapters
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
