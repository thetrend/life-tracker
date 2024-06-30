/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {},
  daisyui: {
    themes: [
      {
        whimsicalDark: {
          primary: '#fdafef',
          'primary-focus': '#f967de',
          'primary-content': '#262831',

          secondary: '#c97eec',
          'secondary-focus': '#b84fe8',
          'secondary-content': '#262831',

          accent: '#fdfdce',
          'accent-focus': '#ffffa8',
          'accent-content': '#262831',

          neutral: '#262831',
          'neutral-focus': '#15171e',
          'neutral-content': '#e8e7ee',

          'base-100': '#0c0925',
          'base-200': '#1c183e',
          'base-300': '#3c3861',
          'base-content': '#e8e7ee',

          info: '#8ad8ff',
          success: '#a2fbc9',
          warning: '#ffd9a3',
          error: '#e56666',

          '--rounded-box': '1.5rem',
          '--rounded-btn': '1rem',
          '--rounded-badge': '2rem',

          '--animation-btn': '.30s',
          '--animation-input': '.5s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.75rem',
          '--border-btn': '1px',
        },
        whimsicalLight: {
          primary: '#fdafef',
          'primary-focus': '#f967de',
          'primary-content': '#262831',

          secondary: '#c97eec',
          'secondary-focus': '#b84fe8',
          'secondary-content': '#262831',

          accent: '#fdfdce',
          'accent-focus': '#ffffa8',
          'accent-content': '#262831',

          neutral: '#f2f2f3',
          'neutral-focus': '#e8e5ec',
          'neutral-content': '#15171e',

          'base-100': '#f2f2f3',
          'base-200': '#e8e5eb',
          'base-300': '#d4ced9',
          'base-content': '#0c0925',

          info: '#8ad8ff',
          success: '#a2fbc9',
          warning: '#ffd9a3',
          error: '#e56666',

          '--rounded-box': '1.5rem',
          '--rounded-btn': '1rem',
          '--rounded-badge': '2rem',

          '--animation-btn': '.30s',
          '--animation-input': '.5s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.75rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
  lightMode: ['class', '[data-theme="whimsicalLight]'],
  darkMode: ['class', '[data-theme="whimsicalDark"]'],
  plugins: [require('daisyui')],
}
