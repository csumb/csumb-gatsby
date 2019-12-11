import React from 'react'
import styled from '@emotion/styled'
import parseHtml from '../parse-html'

const BlockList = ({ type, uuid, list }) => {
  const ListTag =
    type === 'list-unstyled'
      ? styled('ul')`
          list-style-type: none;
          margin-left: 0;
        `
      : styled(type)``

  const listItems = []
  let priorLevel = 1
  let firstLevel = 0
  let secondLevel = 0
  list.forEach((item, key) => {
    if (!item.text || item.text.length === 0 || item.text.trim().length === 0) {
      return
    }
    if (priorLevel === 1 && item.level === 3) {
      item.level = 2
    }
    priorLevel = item.level
    if (item.level === 1) {
      item._children = []
      listItems[key] = item
      firstLevel = key
      return
    }
    if (item.level === 2) {
      item._children = []
      listItems[firstLevel]._children[key] = item
      secondLevel = key
      return
    }

    if (item.level === 3) {
      listItems[firstLevel]._children[secondLevel]._children[key] = item
    }
  })
  return (
    <ListTag data-list-type={type}>
      {listItems.map((item, key) => (
        <li key={`list-${uuid}-${key}`}>
          {parseHtml(item.text)}
          {item._children.length > 0 && (
            <ListTag>
              {item._children.map((secondItem, secondKey) => (
                <li key={`list-${uuid}-${key}-${secondKey}`}>
                  {parseHtml(secondItem.text)}
                  {secondItem._children.length > 0 && (
                    <ListTag>
                      {secondItem._children.map(thirdItem => (
                        <li
                          key={`list-${uuid}-${key}-${secondKey}-${thirdItem}`}
                        >
                          {parseHtml(thirdItem.text)}
                        </li>
                      ))}
                    </ListTag>
                  )}
                </li>
              ))}
            </ListTag>
          )}
        </li>
      ))}
    </ListTag>
  )
}

export default BlockList
