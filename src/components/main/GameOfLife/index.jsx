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

    // http://www.conwaylife.com/wiki/Conway%27s_Game_of_Life#Rules
    function applyRules() {
        const newGenGrid = createNewGrid() // new grid for this new generation

        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                // Get the current cell from the previous generation grid and
                // get its alive neighbor count
                const cell = grid.getCell(x, y)
                const newCell = newGenGrid.getCell(x, y)
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

    function createNewGrid({ randomize = false, modelGrid = null } = {}) {
        const grid = new Grid([])
        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                const cell = modelGrid
                    ? modelGrid.getCell(x, y)
                    : new Cell(x, y, randomize)
                grid.setCell(x, y, cell)
            }
        }
        return grid
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
            if (topConstraint && grid.getCell(prevCellX, prevCellY).alive) {
                count++
            }
            if (grid.getCell(prevCellX, cell.y).alive) {
                count++
            }
            if (bottomConstraint && grid.getCell(prevCellX, nextCellY).alive) {
                count++
            }
        }
        if (rightConstraint) {
            if (topConstraint && grid.getCell(nextCellX, prevCellY).alive) {
                count++
            }
            if (grid.getCell(nextCellX, cell.y).alive) {
                count++
            }
            if (bottomConstraint && grid.getCell(nextCellX, nextCellY).alive) {
                count++
            }
        }
        if (topConstraint && grid.getCell(cell.x, prevCellY).alive) {
            count++
        }
        if (bottomConstraint && grid.getCell(cell.x, nextCellY).alive) {
            count++
        }
        return count
    }

    function drawGrid() {
        // ctx.clearRect(0, 0, width, height)

        for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
                grid.getCell(x, y).draw(ctx)
            }
        }
    }

    class Grid {
        constructor(arr) {
            this.arr = arr
        }
        #getIndex(x, y) {
            return y * width + x
        }
        get length() {
            return this.arr.length
        }
        getCell(x, y) {
            return this.arr[this.#getIndex(x, y)]
        }
        setCell(x, y, cell) {
            const index = y * width + x
            this.arr[this.#getIndex(x, y)] = cell
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

    return <Canvas ref={canvasRef}></Canvas>
}
