import React from 'react';
import { connect } from 'react-redux'
import Plot from 'react-plotly.js';

class Graph extends React.Component {

    state = {
        data: [
            {
            x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
            y: [1, 3, 6],
            type: 'scatter'
            }
        ],
        style: {
            width: '300%',
        },
        layout: {
            autosize: true,
        },

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
     <button label={"Submit"} onClick={this.handleData}/>
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