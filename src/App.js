import React, {useState, useEffect} from 'react';
import './App.scss';
import {INITIAL_BOARD_DIMENSIONS} from "./utils/constants";
import Status from "./components/Status/Status";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Board from "./components/Board/Board";
import {
    getEmptyBoardCells,
    getPopulationCount,
    toggleStatus
} from "./utils/functions/board";
import {stepForward} from "./utils/functions/game";
import Settings from "./components/Settings/Settings";
import {inputs} from "./store/inputs";

const App = () => {
    const [setupInputs, updateSetupInputs] = useState(inputs);
    const [numOfGenerations, updateNumOfGenerations] = useState(0);
    const [numOfPopulation, updateNumOfPopulation] = useState(0);
    const [cells, updateCells] = useState(getEmptyBoardCells(INITIAL_BOARD_DIMENSIONS));
    const [zeroStepCells, setZeroStepCells] = useState([]);
    const [intervalHandler, setIntervalHandler] = useState(null);

    useEffect(() => {
        if (numOfPopulation === 0 && numOfGenerations > 0) {
            clearInterval(intervalHandler);
        }
    }, [intervalHandler, numOfGenerations, numOfPopulation])

    useEffect(() => {
        updateNumOfPopulation(getPopulationCount(cells));
    }, [cells])

    const onCellClick = (rowIndex, colIndex) => {
        if (numOfGenerations === 0) {
            updateCells(toggleStatus(cells, rowIndex, colIndex));
        }
    }

    const initState = () => {
        if (zeroStepCells.length === 0) {
            setZeroStepCells(cells);
            updateNumOfPopulation(getPopulationCount(cells));
        }
    }

    const setNextStep = () => {
        if (numOfPopulation === 0) {
            return
        }

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
        const interval = setInterval(setNextStep, setupInputs.interval.value);

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

    const settingsUpdaters = {
        cells: updateCells,
        aliveCount: updateNumOfPopulation
    };

    return (
        <div className="App">
            <div>
                <Status numOfPopulation={numOfPopulation} numOfGenerations={numOfGenerations}/>
                <Settings cells={cells} updaters={settingsUpdaters} isEnabled={numOfGenerations === 0} inputs={setupInputs} updateInput={updateSetupInputs}/>
            </div>
            <div className="main">
                <Board showEndOverlay={numOfGenerations > 0 && numOfPopulation === 0} onCellClick={onCellClick}
                       cells={cells}/>
                <ControlPanel actions={controlButtonActions}/>
            </div>
        </div>
    );
}

export default App;
