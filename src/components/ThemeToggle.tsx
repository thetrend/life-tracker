import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

const ThemeToggleContainer = styled.div`
  ${tw`
    flex
    flex-row
    cursor-pointer
    gap-2
    items-center
    p-6
    justify-end
  `}
`

function ThemeToggle() {
  const getPreferredTheme = () => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      return savedTheme === 'whimsicalDark'
    }

    // Fall back to OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const [isDarkMode, setIsDarkMode] = useState(getPreferredTheme)

  useEffect(() => {
    const theme = isDarkMode ? 'whimsicalDark' : 'whimsicalLight'

    document.documentElement.setAttribute('data-theme', theme)

    localStorage.setItem('theme', theme)

    // Create a listener to update depending on OS preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isDarkMode])

  const handleToggleChange = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ThemeToggleContainer>
      <FontAwesomeIcon icon={faSun} />
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={handleToggleChange}
        className="toggle theme-controller"
        aria-label="Toggle theme"
      />
      <FontAwesomeIcon icon={faMoon} />
    </ThemeToggleContainer>
  )
}

export default ThemeToggle
