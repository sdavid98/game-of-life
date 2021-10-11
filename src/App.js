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
    const [endOfGame, setEndOfGame] = useState(false);
    const [maxPopulationCount, setMaxPopulationCount] = useState(0);

    useEffect(() => {
        if ((numOfPopulation === 0 && numOfGenerations > 0) || endOfGame) {
            clearInterval(intervalHandler);
        }
    }, [endOfGame, intervalHandler, numOfGenerations, numOfPopulation])

    useEffect(() => {
        updateNumOfPopulation(oldCount => {
            const newCount = getPopulationCount(cells);
            if (newCount > maxPopulationCount) {
                setMaxPopulationCount(newCount);
            }
            
            return newCount;
        });
    }, [cells, maxPopulationCount])

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
        if (numOfPopulation === 0 || JSON.stringify(cells) === JSON.stringify(stepForward(cells))) {
            return;
        }

        updateCells(oldCells => {
            if (JSON.stringify(oldCells) === JSON.stringify(stepForward(oldCells))) {
                setEndOfGame(true);
                return oldCells;
            }

            return stepForward(oldCells)
        });
        updateNumOfGenerations(prevNum => ++prevNum);
    }

    const onForwardClick = () => {
        if (!endOfGame) {
            initState();
            setNextStep();
        }
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
            setEndOfGame(false);
        }
    }

    const onClearClick = () => {
        updateCells(getEmptyBoardCells(INITIAL_BOARD_DIMENSIONS));
        setZeroStepCells([]);
        updateNumOfGenerations(0);
        updateNumOfPopulation(0);
        setEndOfGame(false);
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
            <div className="ui">
                <div className="row">
                    <Settings cells={cells}
                              updateCells={updateCells}
                              isEnabled={numOfGenerations === 0}
                              inputs={setupInputs}
                              updateInput={updateSetupInputs}/>
                    <Status numOfPopulation={numOfPopulation}
                            numOfGenerations={numOfGenerations}
                            percentOfFullBoard={Math.round(100 * numOfPopulation / (setupInputs.width.value * setupInputs.height.value))}/>
                </div>
                <div className="">
                    <Board numOfPopulation={numOfPopulation}
                           maxPopulationCount={maxPopulationCount}
                           showEndOverlay={(numOfGenerations > 0 && numOfPopulation === 0) || endOfGame}
                           onCellClick={onCellClick}
                           cells={cells}/>
                    <ControlPanel actions={controlButtonActions}/>
                </div>
            </div>
        </div>
    );
}

export default App;
