import React from 'react';
import { connect } from 'react-redux'
import Plot from 'react-plotly.js';
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

class Graph extends React.Component {

    state = {
        data: [
            {
            x: [
                '2017-01-04', '2017-01-05', '2017-01-06', '2017-01-09', '2017-01-10', 
                '2017-01-11', '2017-01-12', '2017-01-13', '2017-01-17', '2017-01-18', 
                '2017-01-19', '2017-01-20', '2017-01-23', '2017-01-24', '2017-01-25', 
                '2017-01-26', '2017-01-27', '2017-01-30', '2017-01-31', '2017-02-01', 
                '2017-02-02', '2017-02-03', '2017-02-06', '2017-02-07', '2017-02-08', 
                '2017-02-09', '2017-02-10', '2017-02-13', '2017-02-14', '2017-02-15'
            ],
            close: [
                116.019997, 116.610001, 117.910004, 118.989998, 119.110001, 119.75, 
                119.25, 119.040001, 120, 119.989998, 119.779999, 120, 120.080002, 
                119.970001, 121.879997, 121.940002, 121.949997, 121.629997, 121.349998, 
                128.75, 128.529999, 129.080002, 130.289993, 131.529999, 132.039993, 
                132.419998, 132.119995, 133.289993, 135.020004, 135.509995
            ],
            decreasing: {line: {color: '#ff1a66'}},
            high: [
                116.510002, 116.860001, 118.160004, 119.43, 119.379997, 119.93, 
                119.300003, 119.620003, 120.239998, 120.5, 120.089996, 120.449997, 
                120.809998, 120.099998, 122.099998, 122.440002, 122.349998, 121.629997, 
                121.389999, 130.490005, 129.389999, 129.190002, 130.5, 132.089996, 
                132.220001, 132.449997, 132.940002, 133.820007, 135.089996, 136.270004
            ],
            increasing: {line: {color: '#17BECF'}},
            // line: {color: 'rgba(31,119,180,1)'},
            low: [
                115.75, 115.809998, 116.470001, 117.940002, 118.300003, 118.599998, 
                118.209999, 118.809998, 118.220001, 119.709999, 119.370003, 119.730003, 
                119.769997, 119.5, 120.279999, 121.599998, 121.599998, 120.660004, 
                120.620003, 127.010002, 127.779999, 128.160004, 128.899994, 130.449997, 
                131.220001, 131.119995, 132.050003, 132.75, 133.25, 134.619995
            ], 
            open: [
                115.849998, 115.919998, 116.779999, 117.949997, 118.769997, 118.739998, 
                118.900002, 119.110001, 118.339996, 120, 119.400002, 120.449997, 120, 
                119.550003, 120.419998, 121.669998, 122.139999, 120.93, 121.150002, 
                127.029999, 127.980003, 128.309998, 129.130005, 130.539993, 131.350006, 
                131.649994, 132.460007, 133.080002, 133.470001, 135.520004
            ],
            type: 'candlestick'
            }
        ],
        style: {
            width: '100%',
            height: '100%',
            
        },
        layout: {
            title: { 
                text: 'Graph',
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
            margin: { l: 40, r: 40, t: 50, b: 40 },
            plot_bgcolor:"#3e4444",
            paper_bgcolor:"#3e4444"
        },
        
        timeSeries: ''
    }

    handleTimeSeries = (e) => {
        this.setState({timeSeries: e.target.value})
    }


    handleData = () => {
        const dataKeys = Object.keys(this.props.productData['Time Series (1min)'])
        const dataValues = Object.values(this.props.productData['Time Series (1min)'])
        const closePrice = dataValues.map(value => value['4. close'])
        this.setState({ data: [{ x: dataKeys, y: closePrice, type: 'scatter' }]})
    }

  render() {
    const { data, style, layout } = this.state

      return (
     <div>
     <FormControl className={null}>
        <Select
          value={this.state.timeSeries}
          onChange={this.handleTimeSeries}
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
            data={data} 
            style={style} 
            layout= {layout} 
            useResizeHandler={true}
        />
     </div>     
    )
  }
}

const mapStateToProps = state => ({
    productData: state.productData
})

export default connect(mapStateToProps)(Graph)