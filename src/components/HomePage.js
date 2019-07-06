import React from 'react'
import Socket from './Socket'
import TestTable from './TestTable'


export const HomePage = props => {

    
    return (
        <div >
            <h1 style={{padding: '10px', bottomMargin: '0px'}}>SIGMA</h1>
            <h3>Data visualisation and analytics</h3>
            {/* <Socket /> */}
            <TestTable/>
        </div>
    )
}

export default HomePage