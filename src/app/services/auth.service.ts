import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { TokenStorage } from "../core/token.storage";
import { TokenJwtHelper } from "../core/token.jwthelper";

@Injectable()
export class AuthService {

  activeUser: User = new User();

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private tokenJwtHelper: TokenJwtHelper) {
  }

  attemptAuth(ussername: string, password: string): Observable<any> {
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

  public isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    return !this.tokenJwtHelper.isTokenExpired(token);
  }

}
