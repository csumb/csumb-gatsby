import React from 'react'
import { css } from 'emotion'
import bp from './styles/breakpoints';

const ContainerClass = css(bp({
  marginLeft: 15,
  marginRight: 15,
  margin: [0, 'auto'],
  width: ['auto', 'auto', 700, 1100]
}))

const Container = ({ children }) => (
  <div className={ContainerClass}>
    {children}
  </div>
)

export default Container