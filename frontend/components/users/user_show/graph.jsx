import React from 'react';
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const Graph = props => {
    let {data} = props;
    return (
        <div className="graph">
            <XYPlot 
                xType="ordinal" 
                margin={{ bottom: 100 }} 
                height={500} 
                width={900}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickLabelAngle={-45} />
                <YAxis />
                <VerticalBarSeries 
                    animation="stiff" 
                    color="red" 
                    data={data} />
            </XYPlot>
        </div>
    );
}

export default Graph;