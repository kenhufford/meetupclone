import React, {useState, useEffect} from 'react';
import useFetches from '../hooks/use_fetches';
import Login from './login';
import Signup from './signup';

const SessionForm = (props) => {
  const [loaded, setLoaded] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [locationError, setLocationError] = useState('');
  const [power, setPower] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [technique, setTechnique] = useState(1);
  const [guts, setGuts] = useState(1);
  const {fetchLocations} = props;
  const setters = {
    setName, setEmail, setPassword, setSelectedLocation, setSelectedLocationId,
    setLocationError, setPower, setSpeed, setTechnique, setGuts
  }
  useFetches(setLoaded, [], fetchLocations)
  useEffect(() => {
    return () => props.clearErrors();
  }, [])


  const update = (field) => {
    debugger
    return e => { 
      debugger
      let key = "set"+field;
      console.log(setters[key])
      console.log(e.currentTarget.value)
      setters[key](e.currentTarget.value);
    }
  }

  const toggleSelected = (index) =>{
    let loc = props.locations[index-1];
    setSelectedLocation(loc.name);
    setSelectedLocationID(loc.id);
  }

  const handleDemoLogin = () => {
    let setEmailFoo = setEmail('saitama@gmail.com');
    let setPasswordFoo = setPassword('123456');
    Promise.all([setEmailFoo, setPasswordFoo])
      .then(() => props.processForm({email, password}))
  }

  const handleSubmit = e => {
    e.preventDefault(); 
    if (selectedLocationId === "" && props.formType === "Sign up"){
        setLocationError("Please select a location")
    } else if (props.formType === "Log in"){
      props.processForm({email, password});
    }else {
      props.processForm({
        name,
        email,
        password,
        location_id: selectedLocationId,
        image_url: "gokuURL",
        power,
        guts,
        technique,
        speed
      })
    }
  }

  const renderErrors = () =>  {
    if (!props.errors) return (<ul></ul>)
    return(
      <ul>
        {props.errors.map((error, i) => (
          <li key={`error-${i}`} className="login-form-errors">
            {error}
          </li>
        ))}
      </ul>
    );
  }

  
  const display = props.formType==="Log in" ? (
      <Login
      handleSubmit={handleSubmit} 
      renderErrors={renderErrors} 
      update={update}
      handleDemoLogin={handleDemoLogin}
      email={email} 
      password={password} 
      formType={props.formType}
        />
    ) : (
      <Signup
        handleSubmit={handleSubmit}
        renderErrors={renderErrors}
        update={update}
        toggleSelected={toggleSelected}
        locationError={locationError}
        email={email}
        password={password}
        name={name}
        locations={props.locations}
        selectedLocation={selectedLocation}
        power={power}
        guts={guts}
        technique={technique}
        speed={speed}
        />
  );   
  if(loaded){
    return (
      display
    );
  } else {
    return (
      <div></div>
    )
  }


}

export default SessionForm;
