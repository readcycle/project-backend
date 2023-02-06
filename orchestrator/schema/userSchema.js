const { default: axios } = require("axios");
const usersAPI = "http://localhost:3000/users";

const usersTypeDefs = `#graphql
    #Model
    type User {
        id: Int,
        fullname: String,
        email: String,
        phoneNumber: String,
        city:String,
        favoriteGenre:String,
        favoriteBook:String,
        isBanned: Boolean,
        createdAt: String,
        updatedAt: String
    }

    type UserCredential {
        access_token: String
    }

    type PatchUserResponse {
        message : String
    }

    input UserRegInput {
        fullname: String,
        email: String,
        password: String,
        city: String,
        phoneNumber: String,
        favoriteGenre: String,
        favoriteBook: String
    }



    #Route

    type Query {
        users : [User],
        user(id : Int) : User
    }

    type Mutation {
        userRegister(input : UserRegInput): User,
        userLogin(email: String, password: String): UserCredential
        userEdit(id:Int, input : UserRegInput): PatchUserResponse
        userIsBanned(id : Int): PatchUserResponse
    }
`;

const usersResolvers = {
  Query: {
    users: async () => {
      const { data } = await axios(usersAPI);
      return data;
    },
    user: async (_, { id }) => {
      const { data } = await axios(usersAPI + `/${id}`);
      return data;
    },
  },
  Mutation: {
    userRegister: async (_, { input }) => {
      const { data } = await axios({
        method: "post",
        url: `${usersAPI}/register`,
        data: { ...input },
      });
      return data;
    },
    userLogin: async (_, { email, password }) => {
      const { data } = await axios({
        method: "post",
        url: `${usersAPI}/login`,
        data: { email, password },
      });
      return data;
    },
    userEdit: async (_, { id, input }) => {
      const { data } = await axios({
        method: "put",
        url: `${usersAPI}/${id}`,
        data: { ...input },
      });
      return data;
    },
    userIsBanned: async (_, { id }) => {
      const { data } = await axios({
        method: "patch",
        url: `${usersAPI}/${id}`,
      });
      return data;
    },
  },
};

module.exports = { usersTypeDefs, usersResolvers };
