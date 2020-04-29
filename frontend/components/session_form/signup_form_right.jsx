import React from 'react';

const SignupFormRight = (props) => {
    const {power, guts, technique, speed,update} = props;
    let sliders = [{stat: power,name:"Power"},
                   {stat: guts, name: "Guts" },
                   {stat: technique, name: "Technique" },
                   {stat: speed, name: "Speed" }]
    return (
        <div className="signup-form-container-right">
            <h3 className="login">
                Power Up
            </h3>
            {sliders.map( (slider,i) => {
                return <div className="slidecontainer"
                            key={`${slider.name + i}`}>
                    <input type="range"
                        min="1"
                        max="100"
                        value={slider.stat}
                        className="slider"
                        onChange={(e)=> update(slider.name)(e)}
                    />
                    <p>
                        {`Value: ${slider.stat}`}
                    </p>
                </div>
            })}

        </div>
    )
}

export default SignupFormRight;