import React, { useEffect, useState, useRef } from 'react'
import { Canvas } from './styles'
import { Grid, Cell, isElementOnScreen } from './helpers'

export const GameLogic = ({ width, height, cellSize }) => {
    const canvasRef = useRef()
    const lastKnownScrollPosition = useRef(0)
    const shouldSeedWhenHidden = useRef(true)

    const [ctx, setCtx] = useState(null)
    const [grid, setGrid] = useState(null)

    useEffect(() => {
        if (width) {
            resetCanvas()
        }
    }, [width])

    useEffect(() => {
        if (width && ctx) {
            const grid = createNewGrid({ randomize: true })
            setGrid(grid)
        }
    }, [width, ctx])

    useEffect(() => {
        if (grid && grid.length) {
            drawGrid()
        }
    }, [grid])

    useEffect(() => {
        const handleScroll = () => {
            if (
                Math.abs(window.scrollY - lastKnownScrollPosition.current) < 8
            ) {
                return
            }
            const canvasVisible = isElementOnScreen(canvasRef.current)
            if (canvasVisible) {
                if (grid && grid.length && width) {
                    applyRules()
                    lastKnownScrollPosition.current = window.scrollY
                }
                if (!shouldSeedWhenHidden.current) {
                    shouldSeedWhenHidden.current = true
                }
            } else {
                if (shouldSeedWhenHidden.current) {
                    const grid = createNewGrid({ randomize: true })
                    setGrid(grid)
                    shouldSeedWhenHidden.current = false
                }
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => document.removeEventListener('scroll', handleScroll)
    }, [width, grid])

    function resetCanvas() {
        canvasRef.current.width = width
        canvasRef.current.height = height

        const ctx2d = canvasRef.current.getContext('2d')
        setCtx(ctx2d)
        ctx2d.clearRect(0, 0, width, height)
    }

    function createNewGrid({ randomize = false, modelGrid = null } = {}) {
        const grid = new Grid([], width)
        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                const cell = modelGrid
                    ? modelGrid.getCell(x, y)
                    : new Cell(ctx, cellSize, x, y, randomize)
                grid.setCell(x, y, cell)
            }
        }
        return grid
    }

    // http://www.conwaylife.com/wiki/Conway%27s_Game_of_Life#Rules
    function applyRules() {
        // Create a snapshot of the grid to base the new generation on
        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                const cell = grid.getCell(x, y)
                cell.wasAlive = cell.alive
            }
        }

        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                // Get the current cell from the previous generation grid and
                // get its alive neighbor count
                const cell = grid.getCell(x, y)
                const aliveNeighbors = countAliveNeighbors(cell)

                // cell alive
                if (cell.wasAlive) {
                    // with fewer than two or move than three alive neighbors dies
                    if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                        cell.alive = false
                    }
                    // with two or three alive neighbors stays alive
                    if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                        cell.alive = true
                    }
                } else {
                    // dead cell
                    // with exactly three alive neighbors goes back to life
                    if (aliveNeighbors === 3) {
                        cell.alive = true
                    }
                }
            }
        }
        drawGrid()
    }

    function drawGrid() {
        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                grid.getCell(x, y).draw(ctx)
            }
        }
    }

    function countAliveNeighbors(cell) {
        // Neighbor cells
        const prevCellX = cell.x - cellSize
        const prevCellY = cell.y - cellSize
        const nextCellX = cell.x + cellSize
        const nextCellY = cell.y + cellSize

        // Prevent grabing out of bounds cells
        const leftConstraint = cell.x > 0
        const rightConstraint = cell.x < width - cellSize
        const topConstraint = cell.y > 0
        const bottomConstraint = cell.y < height - cellSize

        let count = 0

        if (leftConstraint) {
            if (topConstraint && grid.getCell(prevCellX, prevCellY).wasAlive) {
                count++
            }
            if (grid.getCell(prevCellX, cell.y).wasAlive) {
                count++
            }
            if (
                bottomConstraint &&
                grid.getCell(prevCellX, nextCellY).wasAlive
            ) {
                count++
            }
        }
        if (rightConstraint) {
            if (topConstraint && grid.getCell(nextCellX, prevCellY).wasAlive) {
                count++
            }
            if (grid.getCell(nextCellX, cell.y).wasAlive) {
                count++
            }
            if (
                bottomConstraint &&
                grid.getCell(nextCellX, nextCellY).wasAlive
            ) {
                count++
            }
        }
        if (topConstraint && grid.getCell(cell.x, prevCellY).wasAlive) {
            count++
        }
        if (bottomConstraint && grid.getCell(cell.x, nextCellY).wasAlive) {
            count++
        }
        return count
    }

    return <Canvas ref={canvasRef}></Canvas>
}
