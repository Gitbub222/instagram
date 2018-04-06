import React, { Component } from 'react';
import logo from '.././media/instagram-brand.svg';
import '.././App.css';

class Profile extends Component {


  render() {

    //console.log(this.props)

    function isLoaded(isLoaded, link) {
      if (isLoaded) {
        return <img className="img-thumbnail" src={link} width={200} alt="insta logo" />
      } else {
        return <img className="img-thumbnail" src={logo} width={200} alt="insta logo" />
      }
    }
    return (
      <div className="Profile">
        <div className="Profile-img">{isLoaded(this.props.profile.isLoaded, this.props.profile.data.profile_pic_url_hd)}

        </div>
        <div className="Profile-bio">
          <h4><strong>{this.props.profile.data.username}</strong></h4>
          <h6><strong>{this.props.profile.posts.count}</strong> posts <strong>{this.props.profile.followers.count}</strong>  followers <strong>{this.props.profile.following.count}</strong>  following</h6>
          <h5>{this.props.profile.data.full_name}</h5>
          <h5 className="bio">{this.props.profile.data.biography}</h5>
        </div>
      </div>
    );
  }

}

export default Profile;
