import React from 'react';

const Status = ({numOfPopulation, numOfGenerations}) => {
    return (
        <div>
            STATUS<br/>
            Population: {numOfPopulation}<br/>
            Generation: {numOfGenerations}
        </div>
    );
};

export default Status;
