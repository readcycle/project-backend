const axios = require('axios')
const genreAPI = "http://localhost:3000/genres"

const genreTypeDefs = `#graphql
    #model
    type Genre {
        id: ID,
        name: String
    }

    #query
    type Query {
        genres: [Genre],
        genre(id: ID): Genre
    }
`

const genreResolvers = {
    Query: {
        genres: async() => {
            try {
                const { data } = await axios.get(genreAPI)
                return data
            } catch (error) {
                return error
            }
        },

        genre: async(parent, args) => {
            try {
                const { data } = await axios.get(`${genreAPI}/${args.id}`)
                return data
            } catch (error) {
                return error
            }
        }
    }
}

module.exports = { genreTypeDefs, genreResolvers }