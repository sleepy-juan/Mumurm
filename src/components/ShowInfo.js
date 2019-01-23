import React, { Component, Fragment } from 'react';
import { Card, Icon } from "semantic-ui-react";

class ShowInfo extends Component{
    render(){
        return(
            <Fragment>
                <Card style={{position:"absolute", top: this.props.y, right: this.props.x, padding:10}}>
                    <Card.Content header={this.props.selected.where}/>
                    <Card.Content description={this.props.selected.how_long}/>
                </Card>
                <Icon onClick={this.props._disableSelected} color='grey' name="close" style={{position:"absolute", top: this.props.y + 35, right: this.props.x + 10}} />
            </Fragment>
        )
    }
}

export default ShowInfo;