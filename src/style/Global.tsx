import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { CrystalTheme } from '@crystals/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends CrystalTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
    font-weight: 100;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.gradients.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
