import React from 'react';
import {withRouter} from 'react-router'
import { XYPlot,LabelSeries, DiscreteColorLegend,  VerticalBarSeries, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const Graph = props => {
    let { verticalData, lineData, labelData, currentUserId,setSelectedGroupId, 
        setSelectedEventId, selectedStat} = props;
    let color = "red";
    switch (selectedStat) {
        case "Power":
            color = "red";
            break;
        case "Speed":
            color = "blue";
            break;
        case "Guts":
            color = "green";
            break;
        case "Technique":
            color = "purple";
            break;
    }
    return (
        <div className="graph">
            <XYPlot 
                xType="ordinal" 
                margin={{ bottom: 100 }} 
                height={500} 
                width={900}
                yDomain={[0, 100]}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickLabelAngle={-45} />
                <YAxis />
                
                <VerticalBarSeries 
                    className="vertical-bar"
                    animation="stiff" 
                    color={color}
                    data={verticalData} 
                    onValueClick={(event)=>{ 
                        if(event.id === currentUserId){
                            setSelectedEventId(undefined);
                            setSelectedGroupId(undefined);
                        } 
                        props.history.push(`/users/${event.id}`);
                    }}
                    />
                <LineSeries
                    animation="stiff" 
                    className="horizontal-line"
                    color="#e29c4c"
                    strokeDasharray={[7, 5]}
                    strokeWidth="4"
                    data={lineData}
                />
                <LabelSeries
                    animation="stiff" 
                    className="label-series"
                    data={labelData} />
            </XYPlot>
        </div>
    );
}

export default withRouter(Graph);