import React, { Component, Fragment } from 'react';
import { Card, Input, Button, Icon } from "semantic-ui-react";

class AddLabel extends Component{
    render(){
        return(
            <Fragment>
                <Card style={{position:"absolute", top: this.props.y, left: this.props.x, padding:10}}>
                    <Card.Content header="Restful?"/>
                    <Card.Content description="Please tell us your restful place!" />
                    <Input onChange={this.props._saveLocation} icon='location arrow' iconPosition='left' placeholder={`Where are you? (${Math.floor(this.props.clicked.lat)}, ${Math.floor(this.props.clicked.lng)})`}/>
                    <Input onChange={this.props._saveTime} icon='clock outline' iconPosition='left' placeholder='How long?' style={{marginTop: 4}} />
                    <Button onClick={this.props._onAddLabel} basic style={{marginTop: 4}}><Icon name="tag"/>Submit!</Button>
                </Card>
                <Icon onClick={this.props._disableClicked} color='grey' name="close" style={{position:"absolute", top: this.props.y + 35, left: this.props.x + 250}} />
            </Fragment>
        )
    }
}

export default AddLabel;