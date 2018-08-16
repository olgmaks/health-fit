import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase/app';
import {UserModel} from '../models/user-model';
import {UserService} from '../services/user-services.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private userService: UserService) {
  }

  ngOnInit() {
  }

  onGitHubSignIn() {
    this.onSocialSignIn(new auth.GithubAuthProvider());
  }

  onFBSignIn() {
    this.onSocialSignIn(new auth.FacebookAuthProvider());
  }

  onGoogleSignIn() {
    this.onSocialSignIn(new auth.GoogleAuthProvider());
  }

  onSocialSignIn(provider) {
    this.afAuth.auth.signInWithPopup(provider).then(result => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);
      }
    ).catch(
      function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...

        console.log(errorCode);
        console.log(errorMessage);
      }
    );
  }
}
