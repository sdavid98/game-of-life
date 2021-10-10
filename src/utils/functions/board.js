export const getEmptyBoardCells = ({rows, cols}) => Array(rows).fill(Array(cols).fill(false));

export const toggleStatus = (cells, rowIndex, colIndex) => {
    cells = cells.map(inner => inner.slice());
    cells[rowIndex][colIndex] = !cells[rowIndex][colIndex];
    return cells;
}

export const getPopulationCount = cells => {
    let count = 0;
    cells.flat().forEach(cell => {
        if (cell) {
            count++;
        }
    });

    return count;
}

export const getRandomGeneratedCells = (density, rowCount, colCount) => {
    const numOfNeededAliveCells = Math.floor(rowCount * colCount * density / 100);
    let selectedCells = [];

    while(selectedCells.length < numOfNeededAliveCells) {
        const rowIndex = Math.floor(Math.random() * rowCount);
        const colIndex = Math.floor(Math.random() * colCount);

        if (!selectedCells.includes(`${rowIndex}-${colIndex}`)) {
            selectedCells.push(`${rowIndex}-${colIndex}`);
        }
    }

    let cells = getEmptyBoardCells({rows: rowCount, cols: colCount});

    selectedCells.forEach((cell, i) => {
        cells = toggleStatus(cells, cell.split('-')[0], cell.split('-')[1])
    });

    return cells;
}