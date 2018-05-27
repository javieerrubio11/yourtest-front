import { Injectable } from '@angular/core';
import { User } from '../models/user';


const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'ActiveUser';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string, user: User) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);

    window.sessionStorage.removeItem(USER_KEY);
    let userStr = JSON.stringify(user);
    window.sessionStorage.setItem(USER_KEY,  userStr);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getActiveUser(): User {
    let userStr = sessionStorage.getItem(USER_KEY);
    return JSON.parse(userStr);
  }
}
