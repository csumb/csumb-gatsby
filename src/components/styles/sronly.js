import { css } from 'emotion'

const sronly = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
  '&:focus': {
      position: 'static',
      width: 'auto',
      height: 'auto',
      overflow: 'visible',
      clip: 'auto',
      whiteSpace: 'normal'
  }
})

export default sronly