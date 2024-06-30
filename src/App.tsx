import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
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

function App() {
  return (
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
  )
}

export default App
