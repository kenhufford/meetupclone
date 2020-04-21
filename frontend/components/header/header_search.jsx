import React, {useState} from 'react';

const HeaderSearch = props =>{
    const [query, setQuery] = useState("");
    const handleSubmit = e =>{
        e.preventDefault();
        setTimeout((() => {
            if (query === "") {
                props.history.push("/groups");
              } else {
                props.history.push(`/search/?name=${query}`);
              }}), 300);
    }
    return(
        <div className="header-search-bar-div">
            <form className="header-search-bar-form" 
                onSubmit={handleSubmit}>
                <input placeholder="Find your fight club" 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.currentTarget.value)} 
                    className="header-search-bar-input"/>
                <i onClick={() => setQuery("")} 
                    className="fas fa-backspace">
                </i>
            </form>
        </div>
    )
}

export default HeaderSearch;

