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

export const resizeBoard = (cells, newRowCount, newColCount) => {
    if (newRowCount > cells.length) {
        const newCells = getEmptyBoardCells({rows: newRowCount - cells.length, cols: cells[0].length});
        cells.push(...newCells);
    }
    else if (newRowCount < cells.length) {
        cells = cells.slice(0, newRowCount);
    }
    else if (newColCount > cells[0].length) {
        cells = cells.map(row => [...row, ...Array(newColCount - row.length).fill(false)]);
    }
    else if (newColCount < cells[0].length) {
        cells = cells.map(row => row.slice(0, newColCount));
    }

    return cells;
}