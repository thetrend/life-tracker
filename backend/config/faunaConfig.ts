import { Client } from 'fauna'

const faunaClient = new Client({
  secret: process.env.FAUNA_SERVER_API_KEY as string,
})

export default faunaClient
