import {DEFAULT_DENSITY, INITIAL_BOARD_DIMENSIONS, INITIAL_TIME_BETWEEN_GENERATIONS_MS} from "../utils/constants";

export const inputs = {
    interval: {
        id: 'interval',
        type: 'number',
        label: 'Time between generation (ms)',
        value: INITIAL_TIME_BETWEEN_GENERATIONS_MS,
        validate: (e) => e.target.value > 0,
    },
    width: {
        id: 'width',
        type: 'number',
        label: 'Width of board (10-100)',
        value: INITIAL_BOARD_DIMENSIONS.cols,
        validate: (e) => e.target.value > 10 && e.target.value < 101
    },
    height: {
        id: 'height',
        type: 'number',
        label: 'Height of board (10-100)',
        value: INITIAL_BOARD_DIMENSIONS.rows,
        validate: (e) => e.target.value > 10 && e.target.value < 101
    },
    random: {
        id: 'random',
        type: 'checkbox',
        label: 'Random starting population',
        value: false
    },
    density: {
        id: 'density',
        type: 'number',
        label: 'Density for random population',
        value: DEFAULT_DENSITY,
        validate: (e) => e.target.value > 0 && e.target.value < 100
    },
};