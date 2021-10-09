import React, {useState} from 'react';
import './App.scss';
import {INITIAL_BOARD_DIMENSIONS, INITIAL_TIME_BETWEEN_GENERATIONS_MS} from "./utils/constants";
import Status from "./components/Status/Status";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Board from "./components/Board/Board";
import {getEmptyBoardCells, getPopulationCount, toggleStatus} from "./utils/functions/board";
import {stepForward} from "./utils/functions/game";

const App = () => {
    const [numOfGenerations, updateNumOfGenerations] = useState(0);
    const [numOfPopulation, updateNumOfPopulation] = useState(0);
    const [cells, updateCells] = useState(getEmptyBoardCells(INITIAL_BOARD_DIMENSIONS));
    const [zeroStepCells, setZeroStepCells] = useState([]);
    const [intervalHandler, setIntervalHandler] = useState(null);

    const onCellClick = (rowIndex, colIndex) => {
        if (numOfGenerations === 0) {
            updateCells(cells => {
                const newCells = toggleStatus(cells, rowIndex, colIndex);
                updateNumOfPopulation(getPopulationCount(newCells));

                return newCells;
            });
        }
    }

    const initState = () => {
        if (zeroStepCells.length === 0) {
            setZeroStepCells(cells);
            updateNumOfPopulation(getPopulationCount(cells));
        }
    }

    const setNextStep = () => {
        updateCells(oldCells => {
            const newCells = stepForward(oldCells)
            updateNumOfPopulation(getPopulationCount(newCells));

            return newCells;
        });
        updateNumOfGenerations(prevNum => ++prevNum);
    }

    const onForwardClick = () => {
        initState();
        setNextStep();
    }

    const onStartClick = () => {
        initState();
        const interval = setInterval(setNextStep, INITIAL_TIME_BETWEEN_GENERATIONS_MS);

        setIntervalHandler(interval);
    }

    const onStateToStepZeroClick = () => {
        if (zeroStepCells.length > 0) {
            updateCells(zeroStepCells);
            updateNumOfGenerations(0);
            updateNumOfPopulation(0);
        }
    }

    const onClearClick = () => {
        updateCells(getEmptyBoardCells(INITIAL_BOARD_DIMENSIONS));
        setZeroStepCells([]);
        updateNumOfGenerations(0);
        updateNumOfPopulation(0);
        intervalHandler && clearInterval(intervalHandler)
    }

    const controlButtonActions = {
        forward: onForwardClick,
        start: onStartClick,
        pause: () => intervalHandler && clearInterval(intervalHandler),
        reset: onStateToStepZeroClick,
        clear: onClearClick
    }

    return (
        <div className="App">
            <Status numOfPopulation={numOfPopulation} numOfGenerations={numOfGenerations}/>
            <div className="main">
                <Board onCellClick={onCellClick} cells={cells}/>
                <ControlPanel actions={controlButtonActions} />
            </div>
        </div>
    );
}

export default App;
