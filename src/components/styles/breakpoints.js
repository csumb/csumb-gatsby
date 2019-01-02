//Use https://github.com/emotion-js/facepaint
import facepaint from 'facepaint'

const breakpoints = [32, 48, 64]

const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}em)`))

export default mq
