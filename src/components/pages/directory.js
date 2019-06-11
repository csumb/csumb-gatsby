import React from 'react'
import { SiteNavigation } from '../layouts/sections/navigation'

const DirectoryNavigation = () => (
  <SiteNavigation
    overrideNavigation={[
      { url: '/directory', name: 'Search people & departments' },
      { url: '/about/map-directions', name: 'Campus map' },
      { url: '/directory/buildings', name: 'Buildings' },
      { url: '/directory/departments', name: 'Departments' },
    ]}
  />
)

export { DirectoryNavigation }
