import React from 'react';
import classes from './ControlPanel.module.scss';

const ControlPanel = ({actions}) => {
    return (
        <>
            <h2>CONTROLS</h2>
            <div className={classes['control-panel']}>
                <button onClick={actions.start}>START</button>
                <button onClick={actions.pause}>PAUSE</button>
                <button onClick={actions.forward}>FORWARD</button>
                <button onClick={actions.clear}>CLEAR</button>
                <button onClick={actions.reset}>RESET TO STEP 0.</button>
            </div>
        </>
    );
};

export default ControlPanel;
