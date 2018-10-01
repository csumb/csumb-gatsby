import React from 'react'
import srOnly from '../../styles/sronly'
import colors from '../../styles/colors'
import Container from '../../container'
import Link from 'gatsby-link'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { css } from 'emotion';

const Footer = ({ children, data }) => (
  <footer className={css`
    background-color: ${colors.tan.light};
    h2 {
      color: ${colors.tan.dark};
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    `}>
    <Container>
      <Grid container justify="center" spacing={16}>
        <Grid item xs={12} md={4}>
        <h2>Popular</h2>
        <ul>
          <li><Link to="http://csumb.edu/jobs" title="">Jobs</Link></li>
          <li><Link to="https://csumb.edu/admissions/visit" title="">Tours</Link></li>
          <li><Link to="/academics" title="">Majors</Link></li>
          <li><Link to="http://csumb.edu/social" title="">Social media</Link></li>
          <li><Link to="/library" title="">Library</Link></li>
        </ul>
        </Grid>
        <Grid item xs={12} md={4}>
        <h2>Tools</h2>
        <ul>
          <li><Link to="/map" title="">Map</Link></li>
          <li><Link to="/mastercalendar" title="">Calendar</Link></li>
          <li><Link to="/directory" title="">Directory</Link></li>
          <li><Link to="/catalog" title="">Catalog</Link></li>
          <li><Link to="/planning/schedule" title="">Class schedule</Link></li>
        </ul>
        </Grid>
        <Grid item xs={12} md={4}>
        <h2>Links for</h2>
        <ul>
          <li><Link to="/families" title="">Parents</Link></li>
          <li><Link to="/international" title="">International students</Link></li>
          <li><Link to="/locals" title="">Locals</Link></li>
          <li><Link to="/veterans" title="">Veterans</Link></li>
          <li><Link to="/employees" title="">Employees</Link></li>
        </ul>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button component={Link} to="/giving" variant="outlined" color="primary">Give</Button>
        </Grid>
      </Grid>
    </Container>
    <div className={css`
      background-color: ${colors.tan.darkest};
      a {
        color: ${colors.tan.light};
        cont-size: 0.8rem;
        margin-right: 1rem;
      }
      `}>
      <Container>
        <Link to="/copyright">Website Copyright/DMCA Policy</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/accessibility">Accessibility</Link>
        <Link to="https://cm.maxient.com/reportingform.php?CSUMontereyBay&amp;layout_id=0">Report concerning behavior</Link>
        <Link to="/titleix">Title <abbr title="nine">IX</abbr></Link>
        <Link to="/diversity">Diversity &amp; Inclusion</Link>
        <Link to="/clery">Security report</Link>
        <Link to="/hr/form-801">Form 801</Link>
        <Link to="/document-reader" className={srOnly}>Some links for may require a Document Reader.</Link>
      </Container>
    </div>
  </footer>
)

export default Footer
