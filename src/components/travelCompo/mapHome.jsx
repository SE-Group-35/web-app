import React, { Component } from 'react';
import Map from './map';

class MapHome extends Component {

	render() {
		return(
			<div style={{ width:"100%"}}>
				<Map
					google={this.props.google}
					center={{lat: 6.9327, lng:  79.8438}}
					height='300px'
					zoom={15}
				/>
			</div>
		);
	}
}

export default MapHome;