import React, { useEffect, useState, useRef } from 'react'
import { Canvas } from './styles'

// const imageSrc = 'game-of-life-background-image.jpg'
const cellSize = 8
const height = 604
let lastKnownScrollPosition = 0
let shouldSeedWhenHidden = true

function isElementOnScreen(el) {
    var rect = el.getBoundingClientRect()
    var viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
    )
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
}

export const GameOfLife = () => {
    const canvasRef = useRef()

    const [width, setWidth] = useState(0)
    const [ctx, setCtx] = useState(null)
    const [grid, setGrid] = useState([])
    const [mousePressed, setMousePressed] = useState(false)

    useEffect(() => {
        resetCanvas()
    }, [])

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
            if (Math.abs(window.scrollY - lastKnownScrollPosition) < 8) {
                return
            }
            const canvasVisible = isElementOnScreen(canvasRef.current)
            if (canvasVisible) {
                if (grid && grid.length && width) {
                    applyRules()
                    lastKnownScrollPosition = window.scrollY
                }
                if (!shouldSeedWhenHidden) {
                    shouldSeedWhenHidden = true
                }
            } else {
                if (shouldSeedWhenHidden) {
                    console.log('shouldSeedWhenHidden > reset canvas!')
                    const grid = createNewGrid({ randomize: true })
                    setGrid(grid)
                    shouldSeedWhenHidden = false
                }
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => document.removeEventListener('scroll', handleScroll)
    }, [width, grid])

    function resetCanvas() {
        const windowWidth = window.innerWidth
        setWidth(windowWidth)

        canvasRef.current.width = windowWidth
        canvasRef.current.height = height

        const ctx2d = canvasRef.current.getContext('2d')
        setCtx(ctx2d)
        ctx2d.clearRect(0, 0, windowWidth, height)
    }

    function updateGrid(x, y, value) {
        const index = y * width + x
        grid[index] = value
    }

    function draw(event) {
        console.log('draw mousePressed', mousePressed)
        if (!mousePressed) return
        const cursorRadius = 10
        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                const cell = grid[x][y]
                const dx = Math.abs(cell.x - event.pageX)
                const dy = Math.abs(cell.y - event.pageY)
                console.log('dx, dy', dx, dy)
                console.log('dx, dy', dx, dy)
                if (dx < cursorRadius && dy < cursorRadius) {
                    cell.alive = true
                }
            }
        }
        refreshGrid()
    }

    // http://www.conwaylife.com/wiki/Conway%27s_Game_of_Life#Rules
    function applyRules() {
        const newGenGrid = createNewGrid() // new grid for this new generation

        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                // Get the current cell from the previous generation grid and
                // get its alive neighbor count
                const cell = grid[x][y]
                const newCell = newGenGrid[x][y]
                const aliveNeighbors = countAliveNeighbors(cell)

                // cell alive
                if (cell.alive) {
                    // with fewer than two or move than three alive neighbors dies
                    if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                        newCell.alive = false
                    }
                    // with two or three alive neighbors stays alive
                    if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                        newCell.alive = true
                    }
                } else {
                    // dead cell
                    // with exactly three alive neighbors goes back to life
                    if (aliveNeighbors === 3) {
                        newCell.alive = true
                    }
                }
            }
        }
        setGrid(newGenGrid)
    }

    function refreshGrid() {
        const gridToRefresh = createNewGrid({ modelGrid: grid })
        setGrid(gridToRefresh)
    }

    function createNewGrid({ randomize = false, modelGrid = null } = {}) {
        const grid = []
        for (let x = 0; x < width; x += cellSize) {
            grid[x] = []
            for (let y = 0; y < height; y += cellSize) {
                grid[x][y] = modelGrid
                    ? modelGrid[x][y]
                    : new Cell(x, y, randomize)
            }
        }
        return grid
    }

    function countAliveNeighbors(cell) {
        const x = cell.x,
            y = cell.y
        let neighbors = 0

        if (x > 0) {
            if (y > 0 && grid[x - cellSize][y - cellSize].alive) {
                neighbors++
            }
            if (grid[x - cellSize][y].alive) {
                neighbors++
            }
            if (
                y < height - cellSize &&
                grid[x - cellSize][y + cellSize].alive
            ) {
                neighbors++
            }
        }
        if (x < width - cellSize) {
            if (y > 0 && grid[x + cellSize][y - cellSize].alive) {
                neighbors++
            }
            if (grid[x + cellSize][y].alive) {
                neighbors++
            }
            if (
                y < height - cellSize &&
                grid[x + cellSize][y + cellSize].alive
            ) {
                neighbors++
            }
        }
        if (y > 0 && grid[x][y - cellSize].alive) {
            neighbors++
        }
        if (y < height - cellSize && grid[x][y + cellSize].alive) {
            neighbors++
        }
        return neighbors
    }

    // function countAliveNeighbors(cell) {
    //     // Get neighbor cells
    //     const prevCellX = cell.x - cellSize
    //     const prevCellY = cell.y - cellSize
    //     const nextCellX = cell.x + cellSize
    //     const nextCellY = cell.y + cellSize

    //     // Prevent grabing out of bounds cells
    //     const leftConstraint = cell.x > 0
    //     const rightConstraint = cell.x < width - cellSize
    //     const topConstraint = cell.y > 0
    //     const bottomConstraint = cell.y < height - cellSize

    //     // Conditions that check for alive cells using constraints
    //     const topLeftAlive =
    //         leftConstraint > 0 &&
    //         topConstraint &&
    //         grid[prevCellX][prevCellY].alive
    //     const leftAlive = leftConstraint > 0 && grid[prevCellX][cell.y].alive
    //     const bottomLeftAlive =
    //         leftConstraint > 0 &&
    //         bottomConstraint &&
    //         grid[prevCellX][nextCellY].alive

    //     const topAlive = topConstraint && grid[cell.x][prevCellY].alive
    //     const bottomAlive = bottomConstraint && grid[cell.x][nextCellY].alive

    //     const topRightAlive =
    //         rightConstraint && topConstraint && grid[nextCellX][prevCellY].alive
    //     const rightAlive = rightConstraint && grid[nextCellX][cell.y].alive
    //     const bottomRightAlive =
    //         rightConstraint &&
    //         bottomConstraint &&
    //         grid[nextCellX][nextCellY].alive

    //     // Count all conditions that are true
    //     return [
    //         topLeftAlive,
    //         topAlive,
    //         topRightAlive,
    //         leftAlive,
    //         rightAlive,
    //         bottomLeftAlive,
    //         bottomAlive,
    //         bottomRightAlive,
    //     ].reduce((alive, aliveCondition) => (aliveCondition ? alive + 1 : 0), 0) // set inital alive count to 0
    // }

    function drawGrid() {
        // ctx.clearRect(0, 0, width, height)

        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                grid[x][y].draw(ctx)
            }
        }
    }

    class Cell {
        constructor(x, y, randomize) {
            this.x = x
            this.y = y
            this.alive = randomize ? Math.random() >= 0.7 : false
        }
        draw(ctx) {
            ctx.beginPath()
            ctx.rect(this.x, this.y, cellSize, cellSize)
            if (this.alive) {
                ctx.fillStyle = 'rgba(255,255,255,1)'
            } else {
                ctx.fillStyle = 'rgba(0,0,0,1)'
            }
            ctx.fill()
        }
    }

    return (
        <div
            onMouseDown={() => setMousePressed(true)}
            onMouseMove={draw}
            onMouseUp={() => setMousePressed(false)}
        >
            <Canvas ref={canvasRef}></Canvas>
        </div>
    )
}
