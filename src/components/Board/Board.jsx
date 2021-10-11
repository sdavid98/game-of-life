import React from 'react';
import classes from './Board.module.scss';
import Cell from "../Cell/Cell";

const Board = ({cells, onCellClick, showEndOverlay, numOfPopulation, maxPopulationCount}) => {

    if (showEndOverlay) {
        return (
            <div className={classes['overlay']} style={{width: cells.length + 'rem', height: cells[0].length + 'rem'}}>
                {numOfPopulation === 0 ? 'Population dropped to 0.' : 'Population reached a constant state.'}<br/>
                Max population count: {maxPopulationCount}
                <strong>GAME OVER</strong>
            </div>
        )
    }

    return (
        <div className={classes['board']} style={{gridTemplateRows: `repeat(${cells.length}, 1fr)`, gridTemplateColumns: `repeat(${cells[0].length}, 1fr)`}}>
            {cells.map((row, rowIndex) => {
                return row.map((cell, colIndex) => <div key={`${rowIndex}-${colIndex}`}>
                    <Cell onClick={onCellClick} isAlive={!!cell} colIndex={colIndex} rowindex={rowIndex}/>
                </div>)
            })}
        </div>
    );
};

export default Board;
