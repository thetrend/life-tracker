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
    items-center 
    justify-center
  `}
`

function App() {
  return (
    <Router>
      <StyledApp>
        <Routes>
          <Route path="/" element={<GuestWelcome />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ThemeToggle />
      </StyledApp>
    </Router>
  )
}

export default App
