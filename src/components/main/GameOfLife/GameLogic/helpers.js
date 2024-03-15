export function isElementOnScreen(el) {
    var rect = el.getBoundingClientRect()
    var viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
    )
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
}

export class Grid {
    constructor(arr, width) {
        this.arr = arr
        this.width = width
    }
    #getIndex(x, y) {
        return y * this.width + x
    }
    get length() {
        return this.arr.length
    }
    getCell(x, y) {
        return this.arr[this.#getIndex(x, y)]
    }
    setCell(x, y, cell) {
        this.arr[this.#getIndex(x, y)] = cell
    }
}

export class Cell {
    constructor(ctx, cellSize, x, y, randomize = false) {
        this.ctx = ctx
        this.cellSize = cellSize
        this.x = x
        this.y = y
        this.alive = randomize ? Math.random() >= 0.7 : false
        this.wasAlive = null
    }
    draw(ctx) {
        // don't draw if the cell is unchanged
        if (this.alive === this.wasAlive) {
            return
        }
        ctx.clearRect(this.x, this.y, this.cellSize, this.cellSize)
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.cellSize, this.cellSize)
        if (this.alive) {
            ctx.fillStyle = 'rgba(255,255,255,0)'
        } else {
            ctx.fillStyle = 'rgba(0,0,0,1)'
        }
        ctx.fill()
    }
}
