import React from 'react'
import SiteNavigation from 'components/layouts/sections/navigation/site'

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
