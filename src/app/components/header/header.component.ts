import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { TokenStorage } from '../../core/token.storage';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  activeUser: User;

  constructor(
    private location: Location,
    private authService: AuthService,
    private token: TokenStorage) { }

  ngOnInit() {
    this.activeUser = this.authService.activeUser;

    let user = this.token.getActiveUser();
    this.authService.updateActiveUser(user);
  }

  signOut() {
    this.token.signOut();
    this.authService.clearActiveUser();
  }

  back() {
    this.location.back();
  }
}
