/*
    MapView.js
    - view Google Map as a background of the service

    Author @ Juan Lee (juanlee@kaist.ac.kr)
*/
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

/* import Data Handling Module for JSON */
import Database from '../utils/Database.js';

import { Label } from "semantic-ui-react";
import AddLabel from './AddLabel.js';
import ShowInfo from './ShowInfo.js';
import SignIn from './SignIn.js';

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

    constructor(props){
        super(props);

        this._onClick = this._onClick.bind(this);
        this._saveLocation = this._saveLocation.bind(this);
        this._saveTime = this._saveTime.bind(this);
        this._onAddLabel = this._onAddLabel.bind(this);
        this._disableSelected = this._disableSelected.bind(this);
        this._disableClicked = this._disableClicked.bind(this);
    }

    // before mounting
    componentWillMount(){
        Database.get("locations").getJSON([])
        .then(result => {
            this.setState({
                locations: result
            })
        });
    }

    // function _onClick: {x, y, lat, lng, event} -> void
    // - handle click event on map
    _onClick = async ({x, y, lat, lng}) => {
        this.setState({
            clicked: {
                lat, lng, x, y
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
        Database.get("locations").getJSON([])
        .then(result => {
            result.push({
                lat: this.state.clicked.lat,
                lng: this.state.clicked.lng,
                where: this.location,
                how_long: this.time
            });

            Database.get("locations").putJSON(result)
            .then(()=>{
                this.setState({
                    locations: result,
                    clicked: false
                })
            })
        });
    }

    _disableSelected = () => {
        this.setState({
            selected: false
        });
    }

    _disableClicked = () => {
        this.setState({
            clicked: false
        });
    }

    _onFinishedLogin = (email) => {
        alert(email);
    }

    // render
    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <SignIn _onFinished = {this._onFinishedLogin} />

                <GoogleMapReact
                onClick = {this._onClick}
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                >
                {
                    this.state.locations.map((value, i) => {
                        return (
                            <Label onClick={()=>{
                                this.setState({
                                    selected: value,
                                    clicked: false,
                                })
                            }} lat={value.lat} lng={value.lng} as='a' color='teal' tag>
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

                { this.state.clicked ? <AddLabel _saveLocation={this._saveLocation} _saveTime={this._saveTime} _onAddLabel={this._onAddLabel} _disableClicked={this._disableClicked} clicked={this.state.clicked} x={this.state.clicked.x} y={this.state.clicked.y} /> : null }
                { this.state.selected ? <ShowInfo _disableSelected = {this._disableSelected} selected={this.state.selected} x={20} y={10} /> : null }
            </div>
        );
    }
}

export default MapView;