import React from 'react'
import { css } from 'emotion'
import bp from './styles/breakpoints'

const ContainerClass = css(
  bp({
    margin: [0, 'auto'],
    width: ['auto', 'auto', 'auto', 1100],
  })
)

const Container = ({ children }) => (
  <div className={ContainerClass}>{children}</div>
)

export default Container
