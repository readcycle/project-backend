const axios = require('axios')
const reportAPI = "http://localhost:3000/reports"
const redis = require('../config/redis')

const reportTypeDefs = `#graphql
    #model
    type Report {
        id: ID,
        title: String,
        content: String,
        reporterId: Int,
        reportedId: Int,
        isSolved: Boolean,
        Issuer: Issuer,
        Victim: Victim,
    }

    type Issuer {
        fullname: String
    }

    type Victim {
        fullname: String
    }

    type ResponseUpdate {
        message: String
    }

    #query
    type Query {
        reports: [Report],
        report(id: ID): Report
    }

    type Mutation {
        addReport(reportedId: ID, title: String, content:String): Report,
        updateReport(id: ID): ResponseUpdate
    }
`

const reportResolvers = {
    Query: {
        reports: async() => {
            try {
                const access_token = await redis.get('access_token')
                console.log(access_token, '<<<<< from redis');
                const { data } = await axios({
                    method: "get",
                    url: reportAPI,
                    headers: {
                        access_token
                    }
                })
                return data
            } catch (error) {
                return error
            }
        },

        report: async(parent, args) => {
            console.log(args);
            try {
                const access_token = await redis.get('access_token')
                const { data } = await axios({
                    method: "get",
                    url: reportAPI + `/${args.id}`,
                    headers: {
                        access_token
                    }
                })
                return data
            } catch (error) {
                return error
            }
        }
    },

    Mutation: {
        addReport: async(parent, args) => {
            try {
                const access_token = await redis.get('access_token')
                console.log(access_token, '<<<<< from redis');
                const { data } = await axios({
                    method: "post",
                    url: reportAPI + `/${args.repoortedId}`,
                    headers: {
                        access_token
                    },
                    data: args
                })

                return data
            } catch (error) {
                return error
            }
        },

        updateReport: async(parent, args) => {
            try {
                const access_token = await redis.get('access_token')
                console.log(access_token, '<<<<< from redis');
                const { data } = await axios({
                    method: "patch",
                    url: reportAPI + `/${args.id}`,
                    headers: {
                        access_token
                    }
                })

                return data
            } catch (error) {
                return error
            }
        }
    }
}

module.exports = { reportTypeDefs, reportResolvers }