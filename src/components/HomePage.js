import React from 'react'
import '../App.css'
import Typography from '@material-ui/core/Typography';


// const imgStyle = {
     
//     width: "50%", 
//     height: "100%",
// }

export const HomePage = props => {

    const filePath = require('../imgs/gettyimages.jpg')
    // const iconPath = require('../assets/icons/hexagon.png')

    const imgStyle={ 
        // objectFit: "contain",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center left',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '50vw', 
        zIndex: '-1000',
        backgroundImage: `url(${filePath})`
        }

    const textStyle={
        backgroundImage: 'linear-gradient(to bottom right, #333333, #5A5454)',
        height: '100vh', 
        width: '50vw',
        textAlign: 'center',
        margin: 'auto',
        color: '#f2e6d9 ',
        fontSize: '50px',
        fontSmooth: 'always',
    }
    
    return (
        <div style={{display: "flex"}}>
            <div style={imgStyle} className="bg"></div>
            <div style={textStyle}>
            <h1 style={{fontFamily: 'Yantramanav, sans-serif', textShadow: '2px 2px #595959', marginTop: '200px'}}>
            SIGMA</h1>
            <p style={{fontFamily: 'Oswald, sans-serif', color: '#f2f2f2'}}>real-time financial data</p>
            </div>
                {/* <img src={filePath} alt={"home page"} style={imgStyle}/> */}
                {/* <div style={{ backgroundColor: 'black', float: 'right', width: "100px", height: "100px"}}></div> */}
                {/* <h1 style={{padding: '0px', margin: '0px'}}>SIGMA</h1>
                <h3>Data visualisation and analytics</h3>
                <iframe src="https://giphy.com/embed/NoLmegAc0u9X2" width="480" height="302" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/satisfying-way-cubes-NoLmegAc0u9X2">via GIPHY</a></p>
            <Socket /> */}
        </div>
    )
}

export default HomePage