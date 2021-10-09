import React from 'react';
import classes from './Board.module.scss';
import Cell from "../Cell/Cell";

const Board = ({cells, onCellClick}) => {

    return (
        <div className={classes['board']} style={{gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gridTemplateRows: `repeat(${cells[0].length})`}}>
            {cells.map((row, rowIndex) => {
                return row.map((cell, colIndex) => <div key={`${rowIndex}-${colIndex}`}>
                    <Cell onClick={onCellClick} isAlive={!!cell} colIndex={colIndex} rowindex={rowIndex}/>
                </div>)
            })}
        </div>
    );
};

export default Board;
