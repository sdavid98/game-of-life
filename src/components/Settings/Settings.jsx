import React, {useState} from 'react';
import {INITIAL_BOARD_DIMENSIONS} from "../../utils/constants";
import {getRandomGeneratedCells, resizeBoard} from "../../utils/functions/board";

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
            SETTINGS<br/>
            {Object.keys(localInputs).map((input) => (
                <input key={input}
                       onChange={e => onInputChange(e, localInputs[input])}
                       type={localInputs[input].type}
                       value={localInputs[input].value}
                       name={input}
                       id={input}
                       disabled={!isEnabled}
                />
            ))}
            <button onClick={onSetSettings}>SET</button>
        </div>
    );
};

export default Settings;
