const { default: axios } = require("axios");
const bookAPI = "http://localhost:3000/books";

const booksTypeDefs = `#graphql
    #Model
    type Book {
        id: Int,
        title: String,
        author: String,
        GenreId: Int,
        createdAt: String,
        updatedAt: String
    }

    input bookInput {
        title: String,
        author: String,
        GenreId: Int
    }

    #Route

    type Query {
        books : [Book],
        book(id : Int) : Book
    }

    type Mutation {
        bookCreate(input : bookInput) : Book
    }
`;

const booksResolvers = {
  Query: {
    books: async () => {
      const { data } = await axios(bookAPI);
      return data;
    },
    book: async (_, { id }) => {
      const { data } = await axios(bookAPI + `/${id}`);
      return data;
    },
  },
  Mutation: {
    bookCreate: async (_, { input }) => {
      const { data } = await axios({
        method: "post",
        url: bookAPI,
        data: { ...input },
      });
      return data;
    },
  },
};

module.exports = { booksTypeDefs, booksResolvers };
