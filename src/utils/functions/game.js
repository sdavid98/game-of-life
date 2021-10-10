export const stepForward = (cells) => {
    cells = cells.map(inner => inner.slice());
    let newGeneration = cells.map(inner => inner.slice());

    cells.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            newGeneration[rowIndex][colIndex] = willCellLive(cells[rowIndex][colIndex], getAliveNeighboursCount(cells, rowIndex, colIndex));
        })
    });

    return newGeneration;
}

const getAliveNeighboursCount = (cells, rowIndex, colIndex) => {
    let aliveCellCount = 0;

    for (let rowDistance = -1; rowDistance < 2; rowDistance++) {
        for (let colDistance = -1; colDistance < 2; colDistance++) {
            if (cells[rowIndex + rowDistance] && cells[rowIndex + rowDistance][colIndex + colDistance]) {
                aliveCellCount++;
            }
        }
    }

    if (cells[rowIndex][colIndex]) {
        aliveCellCount--;
    }

    return aliveCellCount;
}

const willCellLive = (isAlive, countOfAliveNeighbours) => {
    return (isAlive && [2, 3].includes(countOfAliveNeighbours)) || (!isAlive && countOfAliveNeighbours === 3);
}
