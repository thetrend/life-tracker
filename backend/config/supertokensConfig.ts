import EmailPassword from 'supertokens-node/recipe/emailpassword'
import Session from 'supertokens-node/recipe/session'
import Dashboard from 'supertokens-node/recipe/dashboard'

function getBackendConfig() {
  if (!process.env.ST_CONNECTION_URI || !process.env.ST_API_KEY) {
    throw new Error('Environment variables are missing.')
  }
  return {
    supertokens: {
      connectionURI: process.env.ST_CONNECTION_URI as string,
      apiKey: process.env.ST_API_KEY as string,
    },
    appInfo: {
      // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
      appName: 'Life Tracker',
      apiDomain: 'http://localhost:8888',
      websiteDomain: 'http://localhost:8888',
      apiBasePath: '/api',
    },

    recipeList: [EmailPassword.init(), Session.init(), Dashboard.init()],
    isInServerlessEnv: true,
  }
}

export default getBackendConfig
