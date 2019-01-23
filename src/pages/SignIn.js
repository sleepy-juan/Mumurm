import React, { Component } from 'react';
import { Form, Card, Button, Message } from "semantic-ui-react";
import Database from '../utils/Database';

class SignIn extends Component {
  state = {
    signup: false,
    email_error: false,
    password_error: false,
  }

  constructor(props){
    super(props);

    this._onButtonClicked = this._onButtonClicked.bind(this);
  }

  _onButtonClicked = () => {
    if(this.state.signup){
      Database.get("users").getJSON([])
      .then(users => {
        var found = users.filter(user => user.email === this.email);
        if(found.length > 0){
          this.setState({
            email_error: "Email Already Exists"
          });
        }
        else{
          if(this.password !== this.password_again){
            this.setState({
              password_error: "Passwords Are NOT Same"
            });
          }
          else{
            users.push({
              email: this.email,
              password: this.password
            });
            Database.get("users").putJSON(users)
            .then(() => {
              //TODO: Register success
              alert("Register Success");
            })
          }
        }
      });
    }
    else{
      // signin
      Database.get("users").getJSON([])
      .then(users => {
        var found = users.filter(user => user.email === this.email);
        if(found.length < 1){
          this.setState({
            signup: true,
            email_error: false,
            password_error: false
          });
        }
        else{
          if(found[0].password === this.password){
            //TODO: login success
            alert("Login Success")
          }
          else{
            this.setState({
              password_error: "Wrong Password"
            });
          }
        }
      });
    }
  }

  _onEmailChanged = (e) => {
    this.email = e.target.value;
  }

  _onPasswordChanged = (e) => {
    this.password = e.target.value;
  }

  _onPasswordChangedAgain = (e) => {
    this.password_again = e.target.value;
  }

  render() {
    return (
      <div style={{position:"absolute", margin: "auto", top:0, right:0, left:0, bottom:0, width:"300px", height:"400px"}}>
        <Card style={{padding: 10}}>
          <Card.Content header={this.state.signup ? "You need to sign up first!" : "Welcome Back!"} />
          <Card.Content extra>
            <Form>
              <Form.Input onChange = {this._onEmailChanged.bind(this)} label='Email' placeholder='enter@your.email' />
              {this.state.email_error ? <Message negative header="Invalid Email" content={this.state.email_error} /> : null}
              <Form.Input onChange = {this._onPasswordChanged.bind(this)} label='Password' placeholder='Password here' type="password" />
              {this.state.signup ? <Form.Input onChange = {this._onPasswordChangedAgain } label='Password Again' placeholder='Password here' type="password" /> : null}
              {this.state.password_error ? <Message negative header="Invalid Email" content={this.state.password_error} /> : null}
              <Button onClick={this._onButtonClicked} fluid basic>{this.state.signup ? "Nice to meet you!" : "Sign In or Sign Up!"}</Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    );
  }
} 

export default SignIn;
