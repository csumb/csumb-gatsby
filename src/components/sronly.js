import styled from 'react-emotion'

const SROnly = styled('span')`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  &:focus: {
      position: static;
      width: auto;
      height: auto;
      overflow: visible;
      clip: auto;
      whiteSpace: normal;
  }
`

export default SROnly