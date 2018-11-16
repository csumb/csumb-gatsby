import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { UnstyledList } from 'components/type'

const AllPrograms = () => (
  <Flex flexWrap="wrap">
    <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
      <h2>Majors</h2>
      <UnstyledList>
        <li>
          <a href="/sep/biology-bs">Biology B.S.</a>
        </li>
        <li>
          <a href="/business">Business Administration B.S.</a>
        </li>

        <li>
          <a href="/cinearts">Cinematic Arts &amp; Technology B.A.</a>
        </li>
        <li>
          <a href="/hhspp/collaborative-health-human-services-ba">
            Collaborative Health &amp; Human Services B.A.
          </a>
        </li>
        <li>
          <a href="/scd/communication-design-bs">Communication Design B.S.</a>
        </li>
        <li>
          <a href="/scd/computer-science-information-technology-bs">
            Computer Science &amp; Information Technology B.S.
          </a>
        </li>
        <li>
          <a href="/scd/computer-science-information-technology-bs">
            Computer Science B.S.
          </a>
        </li>
        <li>
          <a href="/sep/environmental-science-technology-policy-bs">
            Environmental Science, Technology &amp; Policy B.S.
          </a>
        </li>
        <li>
          <a href="/sep/environmental-studies-bs">Environmental Studies B.A.</a>
        </li>
        <li>
          <a href="/globalstudies/global-studies-ba">Global Studies B.A.</a>
        </li>
        <li>
          <a href="/liberalstudies/human-development-family-studies-ba">
            Human Development &amp; Family Studies B.A.
          </a>
        </li>
        <li>
          <a href="/hcom">Humanities &amp; Communication B.A.</a>
        </li>
        <li>
          <a href="/hcom/about-issm">Integrated Studies B.A.</a>
        </li>
        <li>
          <a href="/wlc/japanese-ba">Japanese Language &amp; Culture B.A.</a>
        </li>
        <li>
          <a href="/kinesiology">Kinesiology B.S.</a>
        </li>
        <li>
          <a href="/liberalstudies">Liberal Studies B.A.</a>
        </li>
        <li>
          <a href="/sep/marine-science-bs">Marine Science B.S</a>
        </li>
        <li>
          <a href="/math">Mathematics B.S.</a>
        </li>
        <li>
          <a href="/mpa">Music B.A.</a>
        </li>
        <li>
          <a href="/nursing">Nursing BSN</a>
        </li>
        <li>
          <a href="/psychology">Psychology B.A.</a>
        </li>
        <li>
          <a href="/SBGS/social-behavioral-sciences-ba">
            Social &amp; Behavioral Sciences B.A.
          </a>
        </li>
        <li>
          <a href="/wlc/spanish-language-and-hispanic-cultures-ba">
            Spanish Language &amp; Hispanic Cultures B.A.
          </a>
        </li>
        <li>
          <a href="/business/bs-sustainable-hospitality-management">
            Sustainable Hospitality Management B.S.
          </a>
        </li>
        <li>
          <a href="/vpa">Visual and Public Art B.A.</a>
        </li>
      </UnstyledList>
    </Box>
    <Box width={[1, 1, 1 / 2, 1 / 2]} px={2}>
      <h2>Graduate degrees</h2>
      <UnstyledList>
        <li>
          <a href="https://csumb.edu/amws" class="">
            Environmental Science M.S.{' '}
          </a>
        </li>
        <li>
          <a href="https://csumb.edu/educationma" class="">
            Education M.A.{' '}
          </a>
        </li>
        <li>
          <a href="https://mba.csumb.edu/" class="">
            Master of Business Administration{' '}
          </a>
        </li>
        <li>
          <a href="https://csumb.edu/mist" class="">
            Instructional Science &amp; Technology, M.S.{' '}
          </a>
        </li>
        <li>
          <a href="https://csumb.edu/sep/marine-science-ms" class="">
            Marine Science M.S.{' '}
          </a>
        </li>
        <li>
          <a href="http://csumb.edu/msw" class="">
            Master of Social Work{' '}
          </a>
        </li>
        <li>
          <a href="https://csumb.edu/mspa" class="">
            Master of Science Physician Assistant{' '}
          </a>
        </li>
      </UnstyledList>
      <h2>Teaching credentials</h2>
      <UnstyledList>
        <li>
          <a href="https://csumb.edu/teach/single-subject-high-school" class="">
            Single Subject
          </a>
        </li>
        <li>
          <a href="http://csumb.edu/teach/multiple-subject-elementary" class="">
            Multiple Subject
          </a>
        </li>
        <li>
          <a href="http://csumb.edu/teach/special-education" class="">
            Special Education
          </a>
        </li>
      </UnstyledList>
    </Box>
  </Flex>
)

export default AllPrograms
