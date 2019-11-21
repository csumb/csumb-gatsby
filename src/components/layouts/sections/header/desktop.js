import React from 'react'
import styled from '@emotion/styled'
import Brand from './brand'
import Container from '../../../common/container'
import Search from './search'
import UserWidget from './user-widget'
import Applicant from './applicant'
import { NavigationLink } from './navigation-link'
import { Flex, Box } from '../../../common/grid'

const DesktopHeaderWrapper = styled('div')`
  padding-top: 0.75rem;
`

const NavigationList = styled('ul')`
  margin-left: 0;
  margin-top: 1rem;
  list-style: none;
`

const BoxHeaderTools = styled(Box)`
  text-align: right;
`

const HeaderDesktop = ({ loginLink }) => (
  <DesktopHeaderWrapper>
    <Container>
      <Flex>
        <Box width={[1, 1, 1 / 3, 1 / 3]} pr={2}>
          <Brand />
        </Box>
        <BoxHeaderTools width={[1, 1, 2 / 3, 2 / 3]} pl={2}>
          <div>
            <Applicant />
            <UserWidget loginLink={loginLink} />
            <Search isMobile={false} />
          </div>
          <nav>
            <NavigationList>
              <NavigationLink to="/about">About</NavigationLink>
              <NavigationLink to="/admissions">Apply</NavigationLink>
              <NavigationLink to="/cost">Cost &amp; aid</NavigationLink>
              <NavigationLink to="/academics">Academics</NavigationLink>
              <NavigationLink to="/life">Campus life</NavigationLink>
              <NavigationLink to="/alumni">Alumni</NavigationLink>
              <NavigationLink to="/everything" last={true}>
                Everything else
              </NavigationLink>
            </NavigationList>
          </nav>
        </BoxHeaderTools>
      </Flex>
    </Container>
  </DesktopHeaderWrapper>
)

export default HeaderDesktop
