import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  activeUser: User = new User();

  constructor(
    private location: Location,
    private authService: AuthService) { }

  ngOnInit() {
    this.activeUser = this.authService.activeUser;
  }

  back () {
    this.location.back();
  }
}
