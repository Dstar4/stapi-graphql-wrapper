const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')

const baseURL = `http://stapi.co/api/v1/rest/animal`

const resolvers = {
  Query: {
    animals: async (parent, args) => {
      return (await fetch(`${baseURL}/search`).then(res => res.json())).animals
    },
    animal: async (parent, args) => {
      const { id } = args
      return (
        await fetch(`http://stapi.co/api/v1/rest/animal?uid=${id}`).then(
          async res => await res.json()
        )
      ).animal
    }
  }
  // Post: {
  //   author: parent => {
  //     const { id } = parent
  //     return fetch(`${baseURL}/posts/${id}/user`).then(res => res.json())
  //   }
  // },
  // User: {
  //   posts: parent => {
  //     const { id } = parent
  //     return fetch(`${baseURL}/users/${id}/posts`).then(res => res.json())
  //   }
  // }
  // Company: {
  //   return fetch(`${baseUrl}`)
  // }
  // Animal: {}
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
