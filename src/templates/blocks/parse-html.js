import React from 'react'
import parse from 'html-react-parser'
import domToReact from 'html-react-parser/lib/dom-to-react'

const strippedTags = ['span', 'div', 'font']

const parserOptions = {
  replace: ({ type, name, attribs, children }) => {
    if (type === 'tag' && name === 'a') {
      return <a href={attribs.href}>{domToReact(children, parserOptions)}</a>
    }

    if (type === 'tag' && name === 'b') {
      return <strong>{domToReact(children, parserOptions)}</strong>
    }
    if (type === 'tag' && name === 'i') {
      return <em>{domToReact(children, parserOptions)}</em>
    }
    if (type === 'tag' && strippedTags.indexOf(name.toLowerCase()) > -1) {
      return <>{domToReact(children, parserOptions)}</>
    }
  },
}

export default text => {
  return parse(text.trim(), parserOptions)
}
