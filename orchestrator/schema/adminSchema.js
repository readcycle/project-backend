const axios = require('axios')
const adminAPI = "http://localhost:3000/admins"

const adminTypeDefs = `#graphql
    #Model
    type Admin {
        id: Int,
        email: String
    }

    type ResponseLogin {
        access_token: String,
        email: String
    }

    #Route
    type Mutation {
        register(email: String, password: String): Admin,
        login(email: String, password: String): ResponseLogin
    }
`

const adminResolvers = {
    Mutation: {
        register: async(parent, args) => {
            console.log(args);
            try {
                const { data } = await axios({
                    method: "post",
                    url: adminAPI + "/register",
                    data: args
                })

                return data
            } catch (error) {
                return error
            }
        },

        login: async(parent, args) => {
            console.log(args);
            try {
                const { data } = await axios({
                    method: "post",
                    url: adminAPI + "/login",
                    data: args
                })

                return data
            } catch (error) {
                return error
            }
        }
    }
}

module.exports = { adminTypeDefs, adminResolvers }