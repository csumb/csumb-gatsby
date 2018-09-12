//Use https://github.com/emotion-js/facepaint
import facepaint from 'facepaint'

const breakpoints = [576, 768, 992, 1200]

const mq = facepaint(
    breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
    )
);

export default mq