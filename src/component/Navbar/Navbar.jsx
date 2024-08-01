import React from 'react'
import './Navbar.css'


const Navbar = ({message}) => {
    return(
        <nav className='nav-wrapper'>
            <div className='nav-content'>
                <div className='arrow-left'>
                    <span className='material-symbols-outlined'>chevron_left</span>
                </div>
                <div className='nav-heading'>
                    <span>{message}</span>
                </div>
         </div>
        </nav>
    )
}

export default Navbar