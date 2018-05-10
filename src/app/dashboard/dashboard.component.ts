import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  private usersUrl = 'http://localhost:8080/api/v1/users/all';  // URL to web api
  users: User[] = [];

  constructor(
    private http: HttpClient) { }

  ngOnInit() {

  }

  testApi(): void {
    this.http.get(this.usersUrl)
    .subscribe(data => {   // data is already a JSON object
        console.log(data);
    });
  }

  testApi2(): void {
    this.http.get('http://localhost:8080/api/v1/users/get/1')
    .subscribe(data => {   // data is already a JSON object
        console.log(data);
    });
  }
}
