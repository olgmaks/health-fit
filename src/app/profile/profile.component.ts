import {Component, OnInit} from '@angular/core';
import {UserModel} from '../models/user-model';
import {UserService} from '../services/user-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authUser: UserModel = {};

  local: string;

  constructor(private userService: UserService) {
    userService.getCurrentUser().subscribe(u => this.authUser = u);
  }

  ngOnInit() {
  }
}
