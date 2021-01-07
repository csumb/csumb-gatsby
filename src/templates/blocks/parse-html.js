import React from 'react'
import parse from 'html-react-parser'
import domToReact from 'html-react-parser/lib/dom-to-react'

const strippedTags = ['span', 'div', 'font', 'img', 'style']

const cleanHref = href => {
  if (!href) {
    return href
  }
  return href
    .replace('/edit.csumb.edu/', '/csumb.edu/')
    .replace(
      '/csumb.edu/sites/default/files/',
      '/edit.csumb.edu/sites/default/files/'
    )
    .replace(`https://csumb.edu/`, '/')
    .replace(`http://csumb.edu/`, '/')
}

const parserOptions = {
  replace: ({ type, name, attribs, children }) => {
    if (type === 'tag' && name === 'a') {
      return (
        <a href={cleanHref(attribs.href)}>
          {domToReact(children, parserOptions)}
        </a>
      )
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
