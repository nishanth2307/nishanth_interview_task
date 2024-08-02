import React,{ useState } from 'react'
import axios from 'axios'

import { options } from '../../utils/data'
import './SegmentForm.css'
import Dropdown from './Dropdown/Dropdown'

const SegmentForm = ({onClose = ()=>{}}) => {

   const [selectedDropdown , setSelectedDropdown] = useState([{label:'Add schema to segment' , value:'Add schema to segment'}]);
   const [selectedvalues , setSelectedValues] = useState([]);
   const [segmentName , setSegmentName] = useState('')
   const [error , setError] = useState('')

   const openDropDown = () => {
    if(selectedvalues.length === selectedDropdown.length){
        setSelectedDropdown((prev)=>[...prev,{label:'Add schema to segment' , value:'Add schema to segment'}])
    }
   }

   const handleSelect = (event , index) => {
       
    const dropdown = [...selectedDropdown];
    const currentValue = event.target.value;

      dropdown[index].value = currentValue;
      dropdown[index].label = event.target.options[event.target.selectedIndex].text;
     setSelectedValues((prev)=>{
        let tmp = prev;
        tmp[index] = currentValue;
        return [...tmp];
    })
      setSelectedDropdown(dropdown);
   }

   const handleremove = (removingIndex) =>{
    setSelectedValues((prev)=>{
        return prev.filter((value,index)=>index !== removingIndex)
    });
    setSelectedDropdown((prev)=>{
        return prev.filter((value,index)=>index !== removingIndex)
    });
   }

   const handleNameSegment = (e) => setSegmentName(e.target.value);

   const postSchema = async (reqBody) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://webhook.site/8ab4809e-e1bc-40c8-bfd0-1fbd05a78e79';
        return await axios.post(proxyUrl+targetUrl,reqBody,{
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            
        })
   }

   const resetForm = ()=>{
       setSelectedDropdown([{label:'Add schema to segment' , value:'Add schema to segment'}]);
       setSelectedValues([]);
       setSegmentName('');
   }

   const handleSubmit = () => {
    if(segmentName && segmentName.trim().length && selectedDropdown.length === selectedvalues.length){
        setError('')
        const requestBody = {
            segment_name: segmentName,
            schema: selectedDropdown.map((schema)=>{
                console.log("schema :",schema);
                return { [schema?.value] : schema?.label}
            })
        }
        postSchema(requestBody).then((res)=>{
            console.log(res , 'res')
            alert("succesfully save your schema ");
            resetForm();
        }).catch((error)=>{
            alert("Sorry unexpected error while submiting your schema");
            console.error("Error : ",error);
        })
        console.log(requestBody);
    }else{
       setError('Please fill all the required fields*')
    }
   }


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
         <div className={`dropdown-wrapper `}>
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
         </div>
            <a id="schema-container"href="#" className={selectedvalues.length !== selectedDropdown.length ? 'linkDisabled' : ''} onClick={openDropDown}>+ Add new schema</a>
         <p style={{color:'red',fontSize:'14px',padding:'0 1rem'}}>{error}</p>
         <div className='footer-content'>
            <button className='save-button' onClick={handleSubmit}>Save the Segment</button>
            <button className='cancel-button' onClick={()=>{
                resetForm();
                onClose();
            }}>Cancel</button>
         </div>
      </section>
    )
}

export default SegmentForm