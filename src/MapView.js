/*
    MapView.js
    - view Google Map as a background of the service

    Author @ Juan Lee (juanlee@kaist.ac.kr)
*/
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

/* import Data Handling Module for JSON */
import Database from './Database.js';

import { Card, Label, Input, Button, Icon } from "semantic-ui-react";

// class MapView
class MapView extends Component {
    // default location to show
    // KAIST, Daejeon
    static defaultProps = {
        center: {
            lat: 36.37,
            lng: 127.36
        },
        zoom: 16
    };

    // state
    state = {
        locations: [],          // array of locations to mark
        clicked: false,
    }

    // before mounting
    componentWillMount(){
        Database.getJSON([])
        .then(result => {
            this.setState({
                locations: result
            })
        });
    }

    // function _onClick: {x, y, lat, lng, event} -> void
    // - handle click event on map
    _onClick = async ({lat, lng}) => {
        this.setState({
            clicked: {
                lat, lng
            }
        });
    }

    _saveLocation = e => {
        this.location = e.target.value;
    }

    _saveTime = e => {
        this.time = e.target.value;
    }

    _onAddLabel = () => {
        Database.getJSON([])
        .then(result => {
            result.push({
                lat: this.state.clicked.lat,
                lng: this.state.clicked.lng,
                where: this.location,
                how_long: this.time
            });

            Database.putJSON(result)
            .then(()=>{
                this.setState({
                    locations: result,
                    clicked: false
                })
            })
        });
    }

    // render
    render() {
        return (
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
                            <Label lat={value.lat} lng={value.lng} as='a' color='teal' tag>
                                {value.how_long}
                            </Label>
                        );
                    })
                }

                {
                    this.state.clicked ?
                    <Label lat={this.state.clicked.lat} lng={this.state.clicked.lng} as='a' color='red' tag>
                        Here!
                    </Label>
                    : null
                }
                </GoogleMapReact>

                {
                    this.state.clicked ?
                    <Card style={{position:"absolute", top: 10, left: 20, padding:10}}>
                        <Card.Content header="Restful?" />
                        <Card.Content description="Please tell us your restful place!" />
                        <Input onChange={this._saveLocation} icon='location arrow' iconPosition='left' placeholder={`Where are you? (${Math.floor(this.state.clicked.lat)}, ${Math.floor(this.state.clicked.lng)})`}/>
                        <Input onChange={this._saveTime} icon='clock outline' iconPosition='left' placeholder='How long?' style={{marginTop: 4}} />
                        <Button onClick={this._onAddLabel} basic style={{marginTop: 4}}><Icon name="tag"/>Submit!</Button>
                    </Card> : null
                }
            </div>
        );
    }
}

export default MapView;