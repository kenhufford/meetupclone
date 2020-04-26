import React from 'react';
import {withRouter} from 'react-router'
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const Graph = props => {
    let { data, currentUserId,setSelectedGroupId, 
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
                width={900}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickLabelAngle={-45} />
                <YAxis />
                <VerticalBarSeries 
                    className="vertical-bar"
                    animation="stiff" 
                    color={color}
                    data={data} 
                    onValueClick={(event)=>{ 
                        if(event.id === currentUserId){
                            setSelectedEventId(undefined);
                            setSelectedGroupId(undefined);
                        } 
                        props.history.push(`/users/${event.id}`);
                    }}
                    />
            </XYPlot>
        </div>
    );
}

export default withRouter(Graph);