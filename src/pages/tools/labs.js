/**
 * To add a new lab, just add the number to the 'labs' array below.
 

(function($) {
    var labs = [1010, 1009, 1008, 1005];
    var customerId = '200b96ee-10c7-4355-83a4-3ded9ab6e845';
    
    var renderLab = function(data) {
        var template = $('#labs-template').html();
        $.each(data, function(index, value) {
            template = template.replace('{{ ' + index + ' }}', value);
        });
        var $lab = $('#labs-container').append(template);
    };
    $(document).ready(function() {
        $.each(labs, function() {
            $.ajax({
                url: 'https://portal.labstats.com/api/public/GetPublicApiData/' + this,
                async: false,
                dataType: 'json',
                headers: { 'Authorization' : customerId },
                success: renderLab
            });
        });
    });
})(jQuery);**/

import React from 'react'
import Layout from 'components/layouts/default'
import { graphql } from 'gatsby'
import PageTitle from 'components/header/page-title'
import Container from 'components/container'
import Loading from 'components/loading'
import { Lab } from 'components/pages/labs'
import { Flex, Box } from '@rebass/grid/emotion'
import { AlertFyi } from 'components/alert'

class LabsPage extends React.Component {

  state = {
    labs: [],
    isReady: false
  }

  componentDidMount() {
    const { labs, customerId } = this.props.data.site.siteMetadata.labs
    labs.forEach(lab => {
      fetch(`https://portal.labstats.com/api/public/GetPublicApiData/${lab}`, {
        headers: {
          'Authorization': customerId
        }
      })
        .then(response => {
          return response.json()
        }).then(lab => {
          const stateLabs = this.state.labs
          stateLabs.push(lab)
          this.setState({
            labs: stateLabs,
            isReady: true
          })
        })
    })
  }

  render() {
    const { labs, isReady } = this.state
    return (
      <Layout pageTitle={"Campus Computer Labs"}>
        <Container>
          <PageTitle>Computer Labs</PageTitle>
          <AlertFyi>
            Cinematic Arts labs are only avaialble for Cinematic Arts students, and may require special training.
          </AlertFyi>
          {isReady ? (
            <Flex flexWrap="wrap">
              {labs.map(lab => (
                <Box width={[1, 1 / 2, 1 / 2]} px={2}>
                  <Lab lab={lab} />
                </Box>
              ))}
            </Flex>
          ) : (
              <Loading>Loading labs</Loading>
            )}
        </Container>
      </Layout>
    )
  }
}

export default LabsPage

export const query = graphql`
  {
    site {
      siteMetadata {
        labs {
          labs
          customerId
        }
      }
    }
  }
`