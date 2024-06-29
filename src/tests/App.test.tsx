import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from '../App'

describe('App', () => {
  it('Should greet with "Hello World!"', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello World!')
  })
})
