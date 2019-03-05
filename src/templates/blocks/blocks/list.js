import React from 'react'
import { ContainerContext, ContainerElement } from '../container-context'
import styled from '@emotion/styled'
import filterCourses from './filter-courses'

class BlockList extends React.Component {
  render() {
    const { type, list } = this.props

    const ListTag =
      type === 'list-unstyled'
        ? styled('ul')`
            list-style-type: none;
            margin-left: 0;
          `
        : styled(type)`
            ${props => props.container};
          `
    return (
      <ContainerContext.Consumer>
        {container => (
          <ContainerElement container={container}>
            <ListTag>
              {list.map((item, key) => (
                <>
                  {item.text && item.text.trim().length > 0 && (
                    <li
                      dangerouslySetInnerHTML={{
                        __html: filterCourses(item.text),
                      }}
                      key={key}
                    />
                  )}
                </>
              ))}
            </ListTag>
          </ContainerElement>
        )}
      </ContainerContext.Consumer>
    )
  }
}

export default BlockList
