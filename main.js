import Grid from './Grid.js'
import Tile from './Tile.js'


const gameBoard = document.getElementById('game-board')

const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()

function setupInput() {
    window.addEventListener('keydown', handleInput, { onece: true })
}

function handleInput(e) {
    switch (e.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break
        default:
            setupInput()
            return
    }

    grid.cells.forEach(cell => cell.mergeTiles())

    setupInput()
}

function moveUp() {
    return slideTiles(grid.cellsByColumn)
}

function moveDown() {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}

function moveLeft() {
    return slideTiles(grid.cellsByRow)
}

function moveRight() {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function slideTiles(cells) {
    cells.forEach(group => {
        for (let index = 1; index < group.length; index++) {
            const cell = group[index]
            if (cell.tile == null) continue
            let lastValidCell
            for (let adjacentCell = index - 1; adjacentCell >= 0; adjacentCell--) {
                const moveToCell = group[adjacentCell]
                if (!moveToCell.canAccept(cell.tile)) break
                lastValidCell = moveToCell
            }
            if (lastValidCell != null) {
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile
                } else {
                    lastValidCell.tile = cell.tile
                }
                cell.tile = null
            }
        }
    })
}