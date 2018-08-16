import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import {first} from 'rxjs/internal/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  loggedInUser: Boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.signInUser();
  }

  signInUser() {
    this.afAuth.authState.subscribe(u => {
      this.loggedInUser = u != null;
    });
  }
}
