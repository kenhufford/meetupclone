import React, { Component } from 'react';
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const Graph = props => {
    let {data} = props;
    return (
        <div className="App">
            <XYPlot xType="ordinal" margin={{ bottom: 90 }} height={500} width={900}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickLabelAngle={-90} />
                <YAxis />
                <VerticalBarSeries data={data} />
            </XYPlot>
        </div>
    );
}

export default Graph;