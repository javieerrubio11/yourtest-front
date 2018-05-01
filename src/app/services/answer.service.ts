import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

import { Answer } from './models/answer';

@Injectable()
export class AnswerService {

  private baseUrl = 'http://localhost:8080/api/v1/answer';
  questions: Answer[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + '/all');
  }

  getByQuestionId(questionId: Long): Observable<any> {
    return this.http.get(this.baseUrl + '/findByQuestion/' + questionId);
  }

  insert(answer: any): Observable<any> {
    return this.http.post(this.baseUrl + '/insert', answer);
  }

  delete(id: Long): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

}
