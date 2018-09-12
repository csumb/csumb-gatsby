import { injectGlobal } from 'emotion'

injectGlobal`
  * {
    box-sizing: border-box;
  }
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans|Noto+Serif');

  body {
    font-family: 'Noto Serif', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Sans', sans-serif;
  }
`