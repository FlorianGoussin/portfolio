import React, { useState, useEffect } from 'react'
import { GameLogic } from './GameLogic'

const imageSrc = 'some_url'

export const GameOfLife = () => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const windowWidth = window.innerWidth
        setWidth(windowWidth)
    }, [])

    return <GameLogic width={width} height={604} cellSize={8} />
}
