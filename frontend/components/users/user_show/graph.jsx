import React from 'react';
import {withRouter} from 'react-router'
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const Graph = props => {
    let { data, currentUserId,setSelectedGroupId, setSelectedEventId} = props;
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