import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

import { Quiz } from '../models/quiz';

@Injectable()
export class QuizService {
  private baseUrl = 'http://localhost:8080/api/v1/quiz';
  users: Quiz[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + '/all');
  }

  getOne(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/get/' + id);
  }

  insert(obj: any): Observable<any> {
    return this.http.post(this.baseUrl + '/insert', obj);
  }
}
