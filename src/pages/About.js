import React, { Component } from 'react';

class About extends Component {
    componentWillMount(){
        window.location = "https://github.com/sleepy-juan/Mumurm";
    }

    render() {
        return (
            <p>Redirecting...</p>
        );
    }
}

export default About;
