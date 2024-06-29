import styled from 'styled-components'
import tw from 'twin.macro'

const StyledApp = styled.div`
  ${tw`
    w-full 
    min-h-screen 
    bg-app-bg-dark 
    text-app-bg-light 
    p-2 
    flex 
    items-center 
    justify-center
  `}
`

const StyledHero = styled.div`
  ${tw`
    p-8 rounded-xl shadow-md w-96 bg-app-primary text-app-bg-light bg-opacity-50 text-center
  `}
`

function App() {
  return (
    <StyledApp>
      <StyledHero>Hello World</StyledHero>
    </StyledApp>
  )
}

export default App
