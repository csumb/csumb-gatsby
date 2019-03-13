import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'style/theme'
import bp from 'style/breakpoints'
import { LinkyButton } from 'components/button'

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

class UniversityPersonnelPageList extends React.Component {
  render() {
    const { pages } = this.props
    return (
      <div>
        <h3>Related pages</h3>
        <dl>
          {pages.map(page => (
            <>
              <dt>
                {page.Link ? (
                  <a href={page.Link}>{page.Name}</a>
                ) : (
                  <LinkyButton
                    onClick={() => {
                      this.setState({
                        expanded: page.Page_ID,
                      })
                    }}
                  >
                    {page.Name}
                  </LinkyButton>
                )}
              </dt>
              <dd>{page.Notes}</dd>
            </>
          ))}
        </dl>
      </div>
    )
  }
}

export {
  UniversityPersonnelForm,
  UniversityPersonnelFormList,
  UniversityPersonnelPageList,
}
