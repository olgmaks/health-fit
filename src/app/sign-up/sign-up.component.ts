import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import GithubAuthProvider = firebase.auth.GithubAuthProvider;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onGitHubSignIn() {
    this.onSocialSignIn(new GithubAuthProvider());
  }

  onSocialSignIn(provider) {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      alert(token);
      alert(user);
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }
}
