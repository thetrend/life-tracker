# Steps to recreate:

1. `pnpm create vite`
1. `cd <project-directory>`
1. `pnpm install`
1. `pnpm run dev`
1. **(In a new terminal tab)** `git init` (Open in Github Desktop and create a new remote repo)
1. `pnpm add -D eslint-config-airbnb-typescript eslint-config-airbnb@19.0.4 eslint@^8.2.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react@^7.28.0 eslint-plugin-react-hooks@^4.3.0`
1. Edit `.eslintrc.cjs`:
   - ```
      // In the extends array
      + 'airbnb',
      + 'airbnb-typescript',
      + 'airbnb/hooks',
      // ...
      // the last entry in the extends array:
      + 'prettier',
      // ...
      parser: '@typescript-eslint/parser',
      + parserOptions: {
      +   ecmaVersion: 'latest',
      +   sourceType: 'module',
      +   project: './tsconfig.json',
      + },
      // ...
      - plugins: ['react-refresh'],
      + plugins: ['react-refresh', 'prettier'],
      // ...
      rules: {
      + 'react/react-in-jsx-scope': 0,
      + 'prettier/prettier': ['error'],
      // ...
      },
     ```
1. `pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier`
1. `touch .prettierrc.cjs`
1. `.prettierrc.cjs`:
   - ```
     + module.exports = {
     +  trailingComma: 'es5',
     +  useTabs: false,
     +  tabWidth: 2,
     +  semi: false,
     +  singleQuote: true,
     + }
     ```
1. `pnpm add -D @commitlint/{cli,config-conventional}`
1. `echo "module.exports = { extends: ['@commitlint/config-conventional'] }" > commitlint.config.cjs`
1. `tsconfig.json`:
   - ```
     - "include": ["src"],
     + "include": ["src", "vite.config.ts", "commitlint.config.cjs"],
     ```
1. If in VS Code on a Mac: `⌘ (Cmd) + Shift + P > Developer: Reload Window`
1. `echo "foo: message" | commitlint` to test commitlint
1. `pnpm add -D husky`
1. `pnpm exec husky init`
1. `echo "pnpm exec commitlint --edit \$1" > .husky/commit-msg`
1. `pnpm add -D lint-staged`
1. `.husky/pre-commit`:
   - ```
     - pnpm test
     + pnpm exec lint-staged
     ```
1. `package.json`: (Find the last `}`):
   - ```
     - }
     + },
     + "lint-staged":{
     +   "**/*.{ts,tsx}":[
     +     "pnpm exec prettier --write",
     +     "pnpm exec eslint --fix"
     +   ]
     + }
     ```
1. `pnpm add -D vitest @testing-library/react @testing-library/jest-dom happy-dom`
1. Add to the "scripts" section of `package.json`:
   - ```
      - "prepare": "husky"
      + "prepare": "husky",
      + "test": "vitest"
     ```
1. `tsconfig.json`:
   - ```
     - "noFallthroughCasesInSwitch": true
     + "noFallthroughCasesInSwitch": true,
     +
     + /* Types */
     + "types": ["vitest/globals", "@testing-library/jest-dom"],
     ```
1. Replace the contents of `vite.config.ts` with:

   - ```
     /* eslint-disable import/no-extraneous-dependencies */
     /// <reference types="vitest" />
     import { defineConfig } from 'vitest/config'
     import react from '@vitejs/plugin-react-swc'

     // https://vitejs.dev/config/
     export default defineConfig({
      plugins: [react()],
      test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/tests/setup.ts',
      },
     })
     ```

1. `mkdir src/tests && touch src/tests/setup.ts`
1. `src/tests/setup.ts`:

   - ```
      /* eslint-disable import/no-extraneous-dependencies */
      import '@testing-library/jest-dom'
      import { expect, afterEach } from 'vitest'
      import { cleanup } from '@testing-library/react'
      import * as matchers from '@testing-library/jest-dom/matchers'

      // Extend Vitest's "expect" method with methods from react-testing-library
      expect.extend(matchers)

      // Run cleanup after each test case
      afterEach(() => {
        cleanup()
      })
     ```

1. `pnpm add -D tailwindcss postcss autoprefixer && pnpm add styled-components`
1. `pnpm exec tailwind init -p`
1. `tsconfig.json`: Replace `include` array with:

   - ```
        "include": [
           "src",
           "vite.config.ts",
           "postcss.config.js",
           "tailwind.config.js",
           "commitlint.config.cjs",
        ],
     ```

1. `tailwind.config.js`:

   - ```
     - content: []
     + content: ['./src/**/*.{ts,tsx}'],
     ```

1. `mkdir src/styles && touch src/styles/global.css`
1. `src/styles/global.css`:

   - ```
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

1. Add `import './styles/global.css'` to `src/main.tsx`
1. Replace `src/App.tsx` with:

- ```
  import styled from 'styled-components'

  const StyledP = styled.p`  color: purple;`

  function App() {
   return (
     <>
       <h1 className="text-3xl">Hello World!</h1>
       <StyledP>This is a paragraph</StyledP>
     </>
   )
  }

  export default App
  ```

36. `touch src/tests/App.test.tsx`:

- ```
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
  ```
