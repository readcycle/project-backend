const { default: axios } = require("axios");
const bidAPI = "http://localhost:3000/bids";

const bidsTypeDefs = `#graphql
    #Model
    type Bid {
        id: Int,
        description: String,
        condition: Int,
        imageUrl: String,
        BookId: Int,
        PostId: Int,
        UserId: Int,
        createdAt: String,
        updatedAt: String,
        User : User,
        Book : Book
    }

    type bidResponse {
        message : String
    }

    input bidInput {
        description: String,
        condition: Int,
        imageUrl: String,
        BookId: Int,
        PostId: Int,
    }

    #Route
    

    type Query {
        bids : [Bid],
        bid(id : Int) : Bid
    }

    type Mutation {
        bidCreate(input : bidInput) : Bid
    }
`;

const bidsResolvers = {
  Query: {
    bids: async (_, __, context) => {
      //   console.log(context);
      const { data } = await axios(bidAPI);
      return data;
    },
    bid: async (_, { id }, context) => {
      //   console.log(id, context);
      const { data } = await axios(bidAPI + `/${id}`);
      return data;
    },
  },
  Mutation: {
    bidCreate: async (_, { input }, context) => {
      const { access_token } = context;
      const { data } = await axios({
        method: "post",
        url: bidAPI,
        headers: {
          access_token,
        },
        data: { ...input },
      });
      return data;
    },
  },
};

module.exports = { bidsTypeDefs, bidsResolvers };
