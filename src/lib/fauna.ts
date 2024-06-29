import faunadb from 'faunadb'

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET as string,
})

export default client
