import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SROnly from '../src/components/utilities/sronly';
import Button from '../src/components/button';

storiesOf('SROnly', module)
.add('with text', () => (
  <SROnly>This is only readable to screen-reader users</SROnly>
));   

storiesOf('Button', module)
.add('with text', () => (
  <Button>A simple button</Button>
))
.add('with emoji', () => (
  <Button>👍🤙🏄</Button>
));   