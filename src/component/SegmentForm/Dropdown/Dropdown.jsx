import React from "react";
import './Dropdown.css'

const Dropdown = ({options , value , selectedvalues = [], label, onChange}) =>{  
    return(
        <select className="dropdown" value={value} onChange={onChange}>
            <option>{label}</option>
            {
                options?.filter((option)=>!selectedvalues.includes(option.value)).map((val) => {
                    return(
                        <option value={val?.value}>{val?.label}</option>
                    )
                })
            }
        </select>
    )
}

export default Dropdown