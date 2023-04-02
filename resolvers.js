const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient({
  errorFormat: "minimal",
});

const resolvers = {
  Query: {
    getAllAuthors: async () => await prisma.author.findMany(),
    getAllBooks: async () => await prisma.book.findMany(),
    getAuthor: async (parent, { id }) =>
      await prisma.author.findUnique({ where: { id } }),
    getBook: async (parent, { id }) =>
      await prisma.book.findUnique({ where: { id } }),
  },
  Mutation: {
    createAuthor: async (parent, { firstName, lastName, age }) =>
      await prisma.author.create({ data: { firstName, lastName, age } }),
    createBook: async (parent, { title, authorId, year }) => {
      const authorExists = await prisma.author.findUnique({
        where: { id: authorId },
      });
      if (!authorExists) {
        throw new Error("Author does not exist");
      }
      return await prisma.book.create({
        data: {
          title: title,
          year: year,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
    },
    updateAuthor: async (parent, { id, firstName, lastName, age }) =>
      await prisma.author.update({
        where: { id },
        data: { firstName, lastName, age },
      }),
    updateBook: async (parent, { id, title, authorId }) =>
      await prisma.book.update({ where: { id }, data: { title, authorId } }),
    deleteAuthor: async (parent, { id }) =>
      await prisma.author.delete({ where: { id } }),
    deleteBook: async (parent, { id }) =>
      await prisma.book.delete({ where: { id } }),
  },
  Book: {
    Author: async (parent, args) =>
      await prisma.author.findUnique({ where: { id: parent.authorId } }),
  },
  Author: {
    books: async (parent, args) =>
      await prisma.book.findMany({ where: { authorId: parent.id } }),
  },
};

module.exports = {
  resolvers,
};
