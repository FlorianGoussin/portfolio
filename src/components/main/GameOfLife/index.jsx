import React, { useState, useEffect, useRef } from 'react'
import simpleParallax from 'simple-parallax-js'
import styled from 'styled-components'
import { GameLogic } from './GameLogic'
import { StyledStaticImage, Img } from './GameLogic/styles'
import { StaticImage } from 'gatsby-plugin-image'

const imageSrc = './clouds.jpeg'
const height = 400
const cellSize = 8

const GameOfLifeWithImage = styled.div`
    position: relative;
    height: ${({ height }) => height}px;
`

export const GameOfLife = () => {
    const gameOfLifeWithImageRef = useRef(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (gameOfLifeWithImageRef.current) {
            new simpleParallax(gameOfLifeWithImageRef.current, { scale: 1.1 })
        }
    }, [])

    useEffect(() => {
        const windowWidth = window.innerWidth
        setWidth(windowWidth)
    }, [])

    // const parentProps = { height }
    const imageProps = {
        width,
        height,
    }

    return (
        <GameOfLifeWithImage height={height} ref={gameOfLifeWithImageRef}>
            <GameLogic width={width} height={height} cellSize={cellSize} />
            {/* <StaticImage {...imageProps} src="./clouds.jpeg" alt="A kitten" /> */}
            <Img src="./clouds.jpeg" alt="Some clouds" />
        </GameOfLifeWithImage>
    )
}
