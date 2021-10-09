import React from 'react';
import classes from './ControlPanel.module.scss';

const ControlPanel = ({actions}) => {
    return (
        <div className={classes['control-panel']}>
            <button onClick={actions.start}>START</button>
            <button onClick={actions.pause}>PAUSE</button>
            <button onClick={actions.forward}>FORWARD</button>
            <button>CLEAR</button>
            <button>RESET</button>
        </div>
    );
};

export default ControlPanel;
