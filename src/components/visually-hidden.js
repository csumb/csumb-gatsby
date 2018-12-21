import styled from 'react-emotion'

const VisuallyHidden = styled('div')`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  position: absolute;
`

export default VisuallyHidden
