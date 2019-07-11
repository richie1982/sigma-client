import React from 'react'
import NavBar2 from './Navbar2'

const HomePage2 = (props) => {


    const filePath = require('../imgs/8648.jpg')

    const imgStyle={ 
        // objectFit: "contain",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '100vw', 
        zIndex: '-1000',
        backgroundImage: `url(${filePath})`
        }

    return(
        <div>
            <NavBar2 />
        <div style={{display: "flex"}}>
            <div style={imgStyle}>
            </div>
        </div>
        </div>
    )
}

export default HomePage2