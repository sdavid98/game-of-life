import React, {useState} from 'react';
import {INITIAL_BOARD_DIMENSIONS} from "../../utils/constants";
import {getRandomGeneratedCells, resizeBoard} from "../../utils/functions/board";
import classes from './Settings.module.scss';

const Settings = ({inputs, updateInput, isEnabled, updateCells}) => {
    const [localInputs, updateLocalInputs] = useState({...inputs});

    const onInputChange = (e, input) => {
        if (typeof input.validate === "undefined" || input.validate(e)) {
            updateLocalInputs(oldInputs => {
                const newInputs = {...oldInputs};
                if (input.type === 'checkbox') {
                    newInputs[input.id].value = e.target.checked;
                } else {
                    newInputs[input.id].value = e.target.value;
                }

                return newInputs;
            });
        }
    }

    const onSetSettings = () => {
        updateInput({...localInputs});
        updateCells(oldCells => {
            let newCells = oldCells.map(inner => inner.slice());

            if (localInputs.height.value !== INITIAL_BOARD_DIMENSIONS.rows || localInputs.width.value !== INITIAL_BOARD_DIMENSIONS.cols) {
                newCells = (resizeBoard(oldCells, localInputs.height.value, localInputs.width.value));
            }

            if (localInputs.random.value) {
                newCells = (getRandomGeneratedCells(localInputs.density.value, localInputs.height.value, localInputs.width.value));
            }

            return newCells;
        })
    }

    return (
        <div>
            <h2>SETTINGS</h2>
            <div>
                {Object.keys(localInputs).map((input) => (
                    <div key={input} className={classes['settings-row']}>
                        <label htmlFor={input}>{localInputs[input].label}</label>
                        <input onChange={e => onInputChange(e, localInputs[input])}
                               type={localInputs[input].type}
                               value={localInputs[input].value}
                               name={input}
                               id={input}
                               disabled={!isEnabled}
                        />
                    </div>
                ))}
            </div>
            <button disabled={!isEnabled} onClick={onSetSettings}>SET</button>
        </div>
    );
};

export default Settings;
