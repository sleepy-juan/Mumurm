import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Pin from './Pin.js';
import { Card, Icon } from 'semantic-ui-react';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 36.37,
      lng: 127.36
    },
    zoom: 16
  };

  state = {
    locations: [],
  }

  _getJSON(){
    return fetch(process.env.REACT_APP_JSON_ENDPOINT)
    .then(res => res.json())
    .then(json => json.result);
  }
  
  _putJSON(json){
    return fetch(process.env.REACT_APP_JSON_ENDPOINT, {
        headers: {
            'Content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(json),
    });
  }

  _onClick = async ({x, y, lat, lng, event}) => {
    var data = await this._getJSON();
    if(!data){
      data = [];
    }

    data.push({
      lat,
      lng,
      text: "Test"
    });

    this.setState({
      locations: data
    });

    this._putJSON(data);
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          onClick = {this._onClick}
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {
            this.state.locations.map((value, i) => {
              return (
                <Pin
                  lng={value.lng}
                  lat={value.lat}
                  text={value.text}
                  key={i}
                />
              );
            })
          }
        </GoogleMapReact>

        <Card style={{position:"absolute", top: 0, left: 20}}>
          <Card.Content header="KAIST" />
          <Card.Content description="KAIST is blahblah~~" />
          <Card.Content extra>
            <Icon name="user" />
            4 Friends
          </Card.Content>
        </Card>
        </div>
    );
  }
}
 
export default SimpleMap;