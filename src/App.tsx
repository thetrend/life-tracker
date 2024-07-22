import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session from 'supertokens-auth-react/recipe/session'
import styled from 'styled-components'
import tw from 'twin.macro'
import { GuestWelcome, Register } from './pages'
import ThemeToggle from './components/ThemeToggle'

const StyledApp = styled.div`
  ${tw`
    w-full 
    min-h-screen 
    p-2 
    flex 
    flex-col 
    items-center
    justify-center
  `}
`

const ThemeToggleWrapper = styled.div`
  ${tw`
    absolute 
    top-2 
    right-2 
    z-10
  `}
`

// eslint-disable-next-line react-refresh/only-export-components
export function getDomain() {
  const host = window.location.hostname
  if (host === 'localhost') {
    return 'http://localhost:8888'
  }

  const { port } = window.location
  if (port !== '0' && port !== '80' && port !== '443' && port !== '') {
    return `https://${host}:${port}`
  }
  return `https://${host}`
}

SuperTokens.init({
  appInfo: {
    appName: "Grace's Life Tracker",
    apiDomain: getDomain(),
    websiteDomain: getDomain(),
    apiBasePath: '/api/auth',
  },
  recipeList: [EmailPassword.init(), Session.init()],
})

function App() {
  return (
    <SuperTokensWrapper>
      <Router>
        <StyledApp>
          <ThemeToggleWrapper>
            <ThemeToggle />
          </ThemeToggleWrapper>
          <Routes>
            <Route path="/" element={<GuestWelcome />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </StyledApp>
      </Router>
    </SuperTokensWrapper>
  )
}

export default App
