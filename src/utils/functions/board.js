export const getEmptyBoardCells = ({rows, cols}) => Array(rows).fill(Array(cols).fill(false));

export const toggleStatus = (cells, rowIndex, colIndex) => {
    cells = cells.map(inner => inner.slice());
    cells[rowIndex][colIndex] = !cells[rowIndex][colIndex];
    return cells;
}