import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { TokenStorage } from '../../core/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
     private router: Router,
     public dialog: MatDialog,
     private authService: AuthService,
     private token: TokenStorage) {
  }

  username: string;
  password: string;

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.token, data.user);
        this.authService.updateActiveUser(data.user);
        this.router.navigate(['']);
      }
    );
  }

  reset(): void {
    this.username = null;
    this.password = null;
  }

}
