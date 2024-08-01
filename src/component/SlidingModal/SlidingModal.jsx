import React from 'react'
import Navbar from '../Navbar/Navbar'
import './SlidingModal.css'
import SegmentForm from '../SegmentForm/SegementForm'


const SlidingModal = ({ isOpen, onClose, children}) =>{
    return(
        <>
            {isOpen && <div className="backdrop" onClick={onClose} />}
            <div className={`modal ${isOpen ? 'open' : ''}`}>
                <Navbar message={"Saving Segment"}/>
            <div className="modal-content">
                    <button className="close-button" onClick={onClose}>
                        <span className='material-symbols-outlined'>close_small</span>
                    </button>
                <SegmentForm />
            </div>
        </div>
      </>
    )
}

export default SlidingModal