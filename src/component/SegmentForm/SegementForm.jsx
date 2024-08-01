import React,{useEffect, useState} from 'react'
import { options } from '../../utils/data'
import './SegmentForm.css'
import Dropdown from './Dropdown/Dropdown'

const SegmentForm = ({onClick}) => {

   const [isDropDownOpen , setIsDropDownOpen] = useState(false)
   const [selectedDropdown , setSelectedDropdown] = useState([]);
   const [selectedvalues , setSelectedValues] = useState([]);
   const [segmentName , setSegmentName] = useState('')

   const openDropDown = () => setIsDropDownOpen(true)

   const handleSelect = (event , index) => {
      const dropdown = [...selectedDropdown]
      let prevValue = dropdown[index].value

      const currentValue = event.target.value;

      dropdown[index].value = currentValue
      dropdown[index].label = event.target.options[event.target.selectedIndex].text
      if(prevValue === "Add schema to segment"){
        dropdown.push({label:'Add schema to segment' , value:'Add schema to segment'})
     }
     setSelectedValues((prev)=>{
        let tmp = prev;
        tmp[index] = currentValue;
        return [...tmp];
    })
      setSelectedDropdown(dropdown);
   }

   const handleremove = (removingIndex) =>{
       
   }

   const handleNameSegment = (e) => setSegmentName(e.target.value)


    return(
      <section className='segment-form-container'>
          <div className="form-wrapper">
            <label>{"Enter the Name of the Segment"}</label>
            <input 
                type="text"
                value={segmentName}
                onChange={handleNameSegment}
            />
            <span>To save your segment, you need to add the schemas<br/> to build the query.</span>
            <div className='task-container'>
               <div className='circle-container'>
                    <div className='circle' style={{backgroundColor:"#1bc677"}}></div>
                    <span>-User Task</span>
              </div>
               <div className='circle-container'>
                    <div className='circle' style={{backgroundColor:"#dc3545"}}></div>
                    <span>-Group Task</span>
              </div>
            </div>
         </div>
         <div className='dropdown-wrapper'>
            {
                selectedDropdown.map((val , index) => {
                    return(
                        <div className='dropdownContainer'>
                            <Dropdown 
                                options={options}
                                value={val?.value}
                                label={val?.label}
                                selectedvalues={selectedvalues}
                                message={""}
                                onChange={(e) => handleSelect(e , index)}
                            />
                            <div className='buttonWrapper'>
                                <button onClick={() =>handleremove(index)}>
                                    <span className='material-symbols-outlined'>minimize</span>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
            <a href="#" onClick={openDropDown}>+ Add new schema</a>
         </div>
         <div className='footer-content'>
            <button className='save-button'>Save the Segment</button>
            <button className='cancel-button' onClick={onClick}>Cancel</button>
         </div>
      </section>
    )
}

export default SegmentForm