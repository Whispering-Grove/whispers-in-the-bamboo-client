import { Global, css } from '@emotion/react'

export const GlobalStyle = () => (
  <Global
    styles={css`
      :root {
        font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;

        color-scheme: light dark;
        color: #181818;
        background-color: #242424;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      html,
      body {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 100%;
      }

      #root {
        overflow: auto;
        width: 100%;
        height: 100%;
      }

      * {
        margin: 0;
        padding: 0;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
        flex-shrink: 0;
      }

      button {
        background: none;
        border: 0;
        cursor: pointer;
      }
    `}
  />
)
