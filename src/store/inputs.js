import {DEFAULT_DENSITY, INITIAL_BOARD_DIMENSIONS, INITIAL_TIME_BETWEEN_GENERATIONS_MS} from "../utils/constants";
import {getEmptyBoardCells, getPopulationCount, getRandomGeneratedCells, resizeBoard} from "../utils/functions/board";

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
        label: 'Width of board (9-100)',
        value: INITIAL_BOARD_DIMENSIONS.cols,
        validate: (e) => e.target.value > 8 && e.target.value < 101,
        onUpdate: (inputs, cells, update) => {
            if (inputs.height.value !== INITIAL_BOARD_DIMENSIONS.rows || inputs.width.value !== INITIAL_BOARD_DIMENSIONS.cols) {
                update.cells(resizeBoard(cells, inputs.height.value, inputs.width.value));
            }
        }
    },
    height: {
        id: 'height',
        type: 'number',
        label: 'Height of board (9-100)',
        value: INITIAL_BOARD_DIMENSIONS.rows,
        validate: (e) => e.target.value > 8 && e.target.value < 101,
        onUpdate: (inputs, cells, update) => {
            if (inputs.height.value !== INITIAL_BOARD_DIMENSIONS.rows || inputs.width.value !== INITIAL_BOARD_DIMENSIONS.cols) {
                update.cells(resizeBoard(cells, inputs.height.value, inputs.width.value));
            }
        }
    },
    random: {
        id: 'random',
        type: 'checkbox',
        label: 'Random starting population',
        value: false,
        onUpdate: (inputs, cells, update) => {
            if (inputs.random.value) {
                update.cells(getRandomGeneratedCells(inputs.density.value, inputs.height.value, inputs.width.value));
            } else {
                update.cells(getEmptyBoardCells({rows: inputs.height.value, cols: inputs.width.value}));
            }
        }
    },
    density: {
        id: 'density',
        type: 'number',
        label: 'Density for random population',
        value: DEFAULT_DENSITY,
        validate: (e) => e.target.value > 0 && e.target.value < 100,
        onUpdate: (inputs, cells, update) => {
            if (inputs.random.value) {
                update.cells(getRandomGeneratedCells(inputs.density.value, inputs.height.value, inputs.width.value));
            } else {
                update.cells(getEmptyBoardCells({rows: inputs.height.value, cols: inputs.width.value}));
            }
        }
    },
};