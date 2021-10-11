import React from 'react';
import classes from './Cell.module.scss';

const Cell = ({isAlive, onClick, rowindex, colIndex}) => {
    let classNames = [[classes['cell']]];
    if (isAlive) classNames.push(classes['cell--alive']);

    return <button className={classNames.join(' ')} onClick={() => onClick(rowindex, colIndex)}/>;
};

export default React.memo(Cell);
