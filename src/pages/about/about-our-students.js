import React from 'react'
import {
  Layout,
  PageTitle,
  SiteNavigation,
  SiteHeader,
} from '../../components/layouts/default'
import Container from '../../components/common/container'
import Chart from 'react-chartjs'
import { Flex, Box } from '../../components/common/grid'
import { graphql } from 'gatsby'

const chartData = {
  gender: [
    {
      label: 'Female',
      value: 63,
      color: '#029555',
    },
    {
      label: 'Male',
      value: 37,
      color: '#3B559A',
    },
  ],
  graduate: [
    {
      label: 'Applied Marine & Watershed Science',
      value: 5,
      color: '#3B559A',
    },
    {
      label: 'Education',
      value: 18,
      color: '#ffe85c',
    },
    {
      label: 'Instructional Science & Technology',
      value: 14,
      color: '#1bc37a',
    },
    {
      label: 'Marine Science',
      value: 7,
      color: '#dddac7',
    },
    {
      label: 'Masters of Business Administration',
      value: 35,
      color: '#001e54',
    },
    {
      label: 'Social Work',
      value: 21,
      color: '#7E96D5',
    },
  ],
  majors: [
    {
      label: 'Biology',
      value: 8,
      color: '#001e54',
    },
    {
      label: 'Business Administration',
      value: 13,
      color: '#d7be25',
    },
    {
      label: 'Cinematic Arts & Technology',
      value: 3,
      color: '#07633B',
    },
    {
      label: 'Collaborative Health & Human Services',
      value: 6,
      color: '#39351b',
    },
    {
      label: 'Communication Design',
      value: 2,
      color: '#7E96D5',
    },
    {
      label: 'Computer Science',
      value: 7,
      color: '#39351b',
    },
    {
      label: 'Computer Science & Information Technology',
      value: 1,
      color: '#001e54',
    },
    {
      label: 'Environmental Science, Technology, & Policy',
      value: 2,
      color: '#1bc37a',
    },
    {
      label: 'Environmental Studies',
      value: 2,
      color: '#d7be25',
    },
    {
      label: 'Global Studies',
      value: 2,
      color: '#07633B',
    },
    {
      label: 'Human Communication',
      value: 7,
      color: '#39351b',
    },
    {
      label: 'Human Development and Family Studies',
      value: 1,
      color: '#7E96D5',
    },
    {
      label: 'Integrated Studies',
      value: 0,
      color: '#7E96D5',
    },
    {
      label: 'Japanese',
      value: 1,
      color: '#7E96D5',
    },
    {
      label: 'Kinesiology',
      value: 9,
      color: '#001e54',
    },
    {
      label: 'Liberal Studies',
      value: 6,
      color: '#ffe85c',
    },
    {
      label: 'Marine Science',
      value: 5,
      color: '#001e54',
    },
    {
      label: 'Mathematics',
      value: 2,
      color: '#07633B',
    },
    {
      label: 'Music',
      value: 1,
      color: '#39351b',
    },
    {
      label: 'Nursing',
      value: 1,
      color: '#001e54',
    },
    {
      label: 'Psychology',
      value: 11,
      color: '#7E96D5',
    },
    {
      label: 'Social & Behavioral Sciences',
      value: 4,
      color: '#001e54',
    },
    {
      label: 'Spanish Language and Hispanic Culture',
      value: 1,
      color: '#7E96D5',
    },
    {
      label: 'Sustainable Hospitality Management',
      value: 1,
      color: '#1bc37a',
    },
    {
      label: 'Visual & Public Art',
      value: 1,
      color: '#ffe85c',
    },
    {
      label: 'Undeclared',
      value: 4,
      color: '#7E96D5',
    },
    {
      label: 'World Languages and Cultures',
      value: 0,
      color: '#7E96D5',
    },
  ],
  age: {
    labels: ['Less than 17', '18-20', '21-24', '25-30', '31+'],
    datasets: [
      {
        label: 'Age',
        data: [0, 33, 46, 14, 7],
        fillColor: '#E89602',
      },
    ],
  },
}

const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1 / 3,
}

const height = 340

const AboutOurStudentsPage = ({ data }) => (
  <Layout pageTitle="About our students">
    <SiteHeader path="/about">About</SiteHeader>
    {data.allCsumbNavigation &&
      data.allCsumbNavigation.edges &&
      data.allCsumbNavigation.edges[0] && (
        <SiteNavigation
          navigation={data.allCsumbNavigation.edges[0].node.navigation}
        />
      )}
    <Container>
      <PageTitle>About our students</PageTitle>
      <Flex>
        <Box width={[1, 1 / 2, 1 / 2]} px={[0, 2]}>
          <h3>Student age</h3>
          <Chart.Bar data={chartData.age} options={options} height={height} />
        </Box>
        <Box width={[1, 1 / 2, 1 / 2]} px={[0, 2]}>
          <h3>Student gender</h3>
          <Chart.Pie
            data={chartData.gender}
            options={options}
            height={height}
          />
        </Box>
        <Box width={[1, 1 / 2, 1 / 2]} px={[0, 2]}>
          <h3>Majors</h3>
          <Chart.Doughnut
            data={chartData.majors}
            options={options}
            height={height}
          />
        </Box>
        <Box width={[1, 1 / 2, 1 / 2]} px={[0, 2]}>
          <h3>Graduate degrees</h3>
          <Chart.Doughnut
            data={chartData.graduate}
            options={options}
            height={height}
          />
        </Box>
      </Flex>
    </Container>
  </Layout>
)

export default AboutOurStudentsPage
export const query = graphql`
  {
    allCsumbNavigation(filter: { site: { eq: "about" } }) {
      edges {
        node {
          site
          navigation
        }
      }
    }
  }
`
