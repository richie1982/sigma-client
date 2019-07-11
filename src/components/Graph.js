import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import Plot from 'react-plotly.js';
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Loader from './Loader'

const loaderStyle = {
    position: 'relative', 
    marginTop: '100px', 
    width: '100%', 
    textAlign: 'center', 
    display: 'block', 
    height: 'auto'
}

const Graph = (props) => {

    const [ loading, setLoading ] = useState(true)
    const [ timeSeries, setTimeSeries ] = useState('TIME_SERIES_INTRADAY')
    const [ graph, setGraph ] = useState({data: [{x: 0, y: 0, }]})
    const [ config, setConfig ] = useState({
        style: {
            width: '100%',
            height: '100%',  
        },
        layout: {
            title: { 
                text: `${props.selectedProduct ? props.selectedProduct.symbol :'No Product Selected...' }`,
                textAlign: 'left',
                font: {
                    color: '#f2f2f2'
                }
            },
            yaxis: {
                color: '#f2f2f2'
            },
            xaxis: {
                color: '#f2f2f2',
                rangeslider: {
                    visible: false
                },
            },
            dragmode: false,
            autosize: true,
            showlegend: false,
            margin: { l: 50, r: 40, t: 50, b: 40 },
            plot_bgcolor:"#3e4444",
            paper_bgcolor:"#3e4444"
        }
    })

    const handleTimeSeries = (e) => {
        setLoading(true)
        e.preventDefault()
        setTimeSeries(e.target.value)
        setTimeout(() => {
            if (e.target.value === 'TIME_SERIES_INTRADAY') {
                handleData(props.productData)
            } else if (e.target.value === 'TIME_SERIES_DAILY') {
                handleDailyData(props.dailyData)
            } else if (e.target.value === 'TIME_SERIES_WEEKLY') {
                handleWeeklyData(props.weeklyData)
            }
            setLoading(false)
        }, 1000)
    }

    const unpack = (rows, key) => {
        return rows.map(row => row[key])
    }

    const handleData = (data) => {
        // debugger
        if (data) {
            const dataKeys = Object.keys(data['Time Series (1min)'])
            const dataValues = Object.values(data['Time Series (1min)'])
            const closePrice = dataValues.map(value => value['4. close'])
            setGraph({data: [{ x: dataKeys, y: closePrice, type: 'scatter', line: { color: '#17BECF'} }]})
        } else {
            setGraph( {data: [{x: 0, y: 0, }]} )
        }
    }   

    const handleDailyData = (data) => {
        if (data) {
            const dataKeys = Object.keys(data['Time Series (Daily)'])
            const dataValues = Object.values(data['Time Series (Daily)'])
            const trace = { 
                x: dataKeys,
                close: unpack(dataValues, '4. close'),
                high: unpack(dataValues, '2. high'),
                low: unpack(dataValues, '3. low'),
                open: unpack(dataValues, '1. open'),
                decreasing: {line: {color: '#ff1a66'}},
                increasing: {line: {color: '#17BECF'}},
                type: 'candlestick',
            }
            setGraph({data: [trace]})
        }   
    } 
    
    const handleWeeklyData = (data) => {
        if (data) {
            const dataKeys = Object.keys(data['Weekly Time Series'])
            const dataValues = Object.values(data['Weekly Time Series'])
            const trace = { 
                x: dataKeys,
                close: unpack(dataValues, '4. close'),
                high: unpack(dataValues, '2. high'),
                low: unpack(dataValues, '3. low'),
                open: unpack(dataValues, '1. open'),
                decreasing: {line: {color: '#ff1a66'}},
                increasing: {line: {color: '#17BECF'}},
                type: 'candlestick',
            }
            setGraph({data: [trace]})
        }
    } 

    const handleLoadSpinner = () => {
        // props.productData &&
            setLoading(false)
    }

    useEffect(() => {
        setTimeout(() => {handleLoadSpinner()}, 1500)
    }, [])

    const { productData } = props

    useEffect(() => {
        if (!!productData) {
            handleData(productData)
        }
    }, [productData])

      return (
     <div>
        {loading
            ? <div style={loaderStyle}>
                <Loader/>
            </div> 
            : <div>
            <FormControl className={null}>
                <Select
                value={props.timeSeries}
                onChange={handleTimeSeries}
                inputProps={{
                    name: 'timeSeries',
                    id: 'timeSeries',
                }}
                >
                    <MenuItem value={'TIME_SERIES_INTRADAY'}>Intra Day</MenuItem>
                    <MenuItem value={'TIME_SERIES_DAILY'}>Day</MenuItem>
                    <MenuItem value={'TIME_SERIES_WEEKLY'}>Week</MenuItem>
                </Select>
            </FormControl>
            <Plot 
                data={graph.data} 
                style={config.style} 
                layout= {config.layout} 
                useResizeHandler={true}
            />
            </div>
        }
     </div>     
    )
}

const mapStateToProps = state => ({
    selectedProduct: state.selectedProduct,
    productData: state.productData,
    dailyData: state.dailyData,
    weeklyData: state.weeklyData,
    timeSeries: state.timeSeries
})

export default connect(mapStateToProps, actions)(Graph)