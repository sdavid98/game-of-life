import React from 'react';
import classes from './Board.module.scss';
import Cell from "../Cell/Cell";

const Board = ({cells, onCellClick, showEndOverlay}) => {

    if (showEndOverlay) {
        return (
            <div className={classes['overlay']} style={{width: cells.length + 'rem', height: cells[0].length + 'rem'}}>
                Population dropped to 0.
                <strong>GAME OVER</strong>
            </div>
        )
    }

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
