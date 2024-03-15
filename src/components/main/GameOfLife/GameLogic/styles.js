import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

export const Canvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`

export const StyledStaticImage = styled(StaticImage)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    ${({ props }) =>
        props &&
        `
        width: ${props.width};
        height: ${props.height};
    `}
`

export const Img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    margin: 0;
`
