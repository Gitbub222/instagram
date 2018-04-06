import React, { Component } from 'react';
import logo from './media/instagram-brand.svg';
import './App.css';

import Profile from './components/Profile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: 0,
      following: 0,
      followers: 0,
      error: null,
      isLoaded: false,
      link: "https://www.instagram.com/yvngswag/?__a=1",
      inputStyle: {
        border: '1px solid red'
      },
      data: {

      },
      docProp: {
        title: "InstaManager"
      }
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.link.trim().length > 0) {
      fetch(this.state.link)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              posts: result.graphql.user.edge_owner_to_timeline_media,
              followers: result.graphql.user.edge_followed_by,
              following: result.graphql.user.edge_follow,
              isLoaded: true,
              data: result.graphql.user,
              docProp: {
                title: "InstaManager | " + result.graphql.user.username + " | "
              }
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: false,
              error
            });
          }
        )
    }

  }

  onSubmit = e => {
    e.preventDefault();
    if (this.input.value.trim().length > 0) {
      this.state.link = "https://www.instagram.com/" + this.input.value + "/?__a=1";
      this.componentDidMount();
      this.input.value = "";
    } else {
      this.input.style = this.state.inputStyle;
      this.input.value = "";
    }

  }

  render() {


    document.title = this.state.docProp.title;
    return (
      <div className="container">
        <div className="App-header">
          <div>
            <img className="logo" src={logo} width={100} alt="insta logo" />
          </div>
          <div className="title">
            <h1>InstaManager</h1>
          </div>
        </div>


        <div className="well">
          <div className="search">
            <form onSubmit={this.onSubmit}>
              <input placeholder="e.g yvngswag" maxLength="25" className="form-control" ref={input => this.input = input} />
            </form>
          </div>
          <hr />
          <Profile profile={this.state} />
        </div>
      </div>
    );
  }

}

export default App;
