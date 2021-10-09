import React, {useState} from 'react';
import './App.scss';
import {INITIAL_BOARD_DIMENSIONS, INITIAL_TIME_BETWEEN_GENERATIONS_MS} from "./utils/constants";
import Status from "./components/Status/Status";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Board from "./components/Board/Board";
import {getEmptyBoardCells, toggleStatus} from "./utils/functions/board";
import {stepForward} from "./utils/functions/game";

const App = () => {
    const [numOfGenerations, updateNumOfGenerations] = useState(0);
    const [cells, updateCells] = useState(getEmptyBoardCells(INITIAL_BOARD_DIMENSIONS));
    const [intervalHandler, setIntervalHandler] = useState(null);

    const onCellClick = (rowIndex, colIndex) => {
        console.log(rowIndex, colIndex);
        if (numOfGenerations > 0) {
            return;
        }
        updateCells(toggleStatus(cells, rowIndex, colIndex));
    }

    const onForwardClick = () => {
        updateCells(stepForward(cells));
        updateNumOfGenerations(prevNum => ++prevNum);
    }

    const onStartClick = () => {
        const interval = setInterval(() => {
            console.log('STEP');
            updateCells(oldCells => stepForward(oldCells));
            updateNumOfGenerations(prevNum => ++prevNum);
        }, INITIAL_TIME_BETWEEN_GENERATIONS_MS);

        setIntervalHandler(interval);
    }

    const controlButtonActions = {
        forward: onForwardClick,
        start: onStartClick,
        pause: () => clearInterval(intervalHandler)
    }

    return (
        <div className="App">
            <Status/>
            <div className="main">
                <Board onCellClick={onCellClick} cells={cells}/>
                <ControlPanel actions={controlButtonActions} />
            </div>
        </div>
    );
}

export default App;
