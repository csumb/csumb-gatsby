import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import bp from 'style/breakpoints'
import { LinkyButton } from 'components/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Flex, Box } from '@rebass/grid/emotion'

const FormsList = styled('div')`
  ${props =>
    !props.fullWidth &&
    bp({
      float: ['none', 'right'],
      width: ['auto', '30%'],
      borderLeft: ['none', `1px solid ${colors.muted.dark}`],
      margin: [0, '1rem 0 1rem 1rem'],
      padding: [0, '1rem 0 1rem 1rem'],
    })}
`

const UniversityPersonnelForm = ({ form }) => {
  if (!form.data.Attachments) {
    return null
  }
  return (
    <>
      <dt>
        <a href={form.data.Attachments[0].url}>{form.data.Name}</a>
      </dt>
      <dd>{form.data.Notes}</dd>
    </>
  )
}

const UniversityPersonnelFormList = ({ forms, fullWidth }) => (
  <FormsList fullWidth={fullWidth}>
    <h3>Related documents &amp; forms</h3>
    <dl>
      {forms.Documents.map(form => (
        <UniversityPersonnelForm form={form} />
      ))}
    </dl>
  </FormsList>
)

const PageListItem = styled('div')`
  margin: 0.5rem 0;
`

const PageListBox = styled(Box)`
  border-right: 1px solid ${colors.muted.light};
`

const UniversityPersonnelPagesChevron = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  float: right;
  display: inline-block;
`

const UniversityPersonnelPagesButton = styled(LinkyButton)`
  display: block;
  width: 100%;
`

class UniversityPersonnelPages extends React.Component {
  state = {
    expanded: [],
  }

  render() {
    const { pages, parentId } = this.props
    const { expanded } = this.state
    if (!pages) {
      return null
    }

    pages.forEach(page => {
      page.node.data.__hasChildren = false
      pages.forEach(child => {
        if (child.node.data && child.node.data.Parent) {
          child.node.data.Parent.forEach(parent => {
            if (parent.data.Page_ID === page.node.data.Page_ID) {
              page.node.data.__hasChildren = true
            }
          })
        }
      })
    })

    return (
      <Flex flexWrap="wrap">
        <UniversityPersonnelPagesList
          pages={pages}
          parentId={parentId}
          showPageTitle={false}
          handleExpand={id => {
            this.setState({
              expanded: [id],
            })
          }}
        />
        {expanded[0] && (
          <UniversityPersonnelPagesList
            pages={pages}
            parentId={expanded[0]}
            showPageTitle={true}
            handleExpand={id => {
              this.setState({
                expanded: [expanded[0], id],
              })
            }}
          />
        )}
        {expanded[1] && (
          <UniversityPersonnelPagesList
            pages={pages}
            parentId={expanded[1]}
            noButtons={true}
            showPageTitle={true}
          />
        )}
      </Flex>
    )
  }
}

const UniversityPersonnelPagesList = ({
  pages,
  parentId,
  handleExpand,
  showPageTitle,
  noButtons,
}) => {
  const listPages = []
  let currentPage = false
  pages.forEach(page => {
    if (page.node.data.Page_ID === parentId) {
      currentPage = page
    }
    if (page.node.data && page.node.data.Parent) {
      page.node.data.Parent.forEach(parent => {
        if (parent.data && parent.data.Page_ID === parentId) {
          listPages.push(page)
        }
      })
    }
  })

  return (
    <PageListBox width={[1, 1 / 3]} pr={[0, 2]} pl={[0, 2]}>
      {showPageTitle && (
        <div>
          <h2>
            <a href={currentPage.node.data.Link}>
              {currentPage.node.data.Name}
            </a>
          </h2>
          <p>{currentPage.node.data.Content}</p>
        </div>
      )}
      {listPages.map(page => (
        <PageListItem key={page.node.id}>
          <h4>
            {page.node.data.__hasChildren && !noButtons ? (
              <UniversityPersonnelPagesButton
                onClick={event => {
                  event.preventDefault()
                  handleExpand(page.node.data.Page_ID)
                }}
              >
                <UniversityPersonnelPagesChevron icon={faChevronRight} />
                {page.node.data.Name}
              </UniversityPersonnelPagesButton>
            ) : (
              <a href={page.node.data.Link}>{page.node.data.Name}</a>
            )}
          </h4>
          <p>{page.node.data.Content}</p>
        </PageListItem>
      ))}
    </PageListBox>
  )
}

export {
  UniversityPersonnelForm,
  UniversityPersonnelFormList,
  UniversityPersonnelPages,
}
