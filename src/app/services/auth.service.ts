import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  activeUser: User = new User();

  constructor(private http: HttpClient) {
  }

  attemptAuth(ussername: string, password: string): Observable {
    const credentials = {username: ussername, password: password};
    return this.http.post('http://localhost:8080/token/generate-token', credentials);
  }

  updateActiveUser(user): void {
    Object.assign(this.activeUser, user);
  }

  clearActiveUser(): void {
    Object.keys(this.activeUser).forEach(key => {
      delete this.activeUser[key];
    });
  }

}
