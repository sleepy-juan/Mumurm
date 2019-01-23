import React, { Component } from 'react';
import { Form, Card, Button } from "semantic-ui-react";

class SignIn extends Component {
  state = {
    signup: false
  }

  _onButtonClicked = () => {
    this.setState({
      signup: !this.state.signup
    })
  }

  render() {
    return (
      <div style={{position:"absolute", margin: "auto", top:0, right:0, left:0, bottom:0, width:"300px", height:"400px"}}>
        <Card style={{padding: 10}}>
          <Card.Content header={this.state.signup ? "Nice to meet you!" : "Welcome Back!"} />
          <Card.Content extra>
            <Form>
              <Form.Input label='Email' placeholder='enter@your.email' />
              <Form.Input label='Password' placeholder='Password here' type="password" />
              {this.state.signup ? <Form.Input label='Password Again' placeholder='Password here' type="password" /> : null}
              <Button onClick={this._onButtonClicked} fluid basic>{this.state.signup ? "You need to sign up first!" : "Sign In or Sign Up!"}</Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default SignIn;
