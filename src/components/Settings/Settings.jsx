import React from 'react';

const Settings = ({inputs, updateInput, isEnabled}) => {
    const onInputChange = (e, input) => {
        if (typeof input.validate === "undefined" || input.validate(e)) {
            updateInput(oldInputs => {
                const newInputs = {...oldInputs};
                if (input.type === 'checkbox') {
                    newInputs[input.id].value = e.target.checked;
                }
                else {
                    newInputs[input.id].value = e.target.value;
                }

                return newInputs;
            });
        }
    }

    return (
        <div>
            SETTINGS<br/>
            {Object.keys(inputs).map((input) => (
                <input key={input}
                       onChange={e => onInputChange(e, inputs[input])}
                       type={inputs[input].type}
                       value={inputs[input].value}
                       name={input}
                       id={input}
                       disabled={!isEnabled}
                />
            ))}
        </div>
    );
};

export default Settings;
