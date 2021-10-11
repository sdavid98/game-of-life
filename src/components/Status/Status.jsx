import React from 'react';

const Status = ({numOfPopulation, numOfGenerations, percentOfFullBoard}) => {
    return (
        <div>
            <h2>STATUS</h2>
            Population: {numOfPopulation} ({percentOfFullBoard}%)<br/>
            Generation: {numOfGenerations}
        </div>
    );
};

export default Status;
