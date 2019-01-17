import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';

class Pin extends Component {
    render() {
        return (
            <Label as='a' color='teal' tag>{this.props.text}</Label>
        )
    }
}

export default Pin;