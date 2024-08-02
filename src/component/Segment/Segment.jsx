import React,{useState} from 'react'
import './Segment.css'
import SlidingModal from '../SlidingModal/SlidingModal';
import Navbar from '../Navbar/Navbar';
import SegmentForm from '../SegmentForm/SegementForm';

const Segment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleModal = () => setIsModalOpen(!isModalOpen)

    return(
      <section className='segment-container'>
         <div className='segment-wrapper'>
            <button onClick={handleModal}>{"Create Segment"}</button>
            {/* <div className='segement-table'>
                <table className='table'>
                  <thead></thead>
                </table>
            </div> */}
         </div>
          <SlidingModal isOpen={isModalOpen} onClose={handleModal}>
            <SegmentForm onClose={handleModal}/>
          </SlidingModal>
      </section>
    )
}

export default Segment