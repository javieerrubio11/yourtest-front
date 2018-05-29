import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

import { Question } from '../models/question';

@Injectable()
export class QuestionService {

  private baseUrl = 'http://localhost:8080/api/v1/question';
  questions: Question[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + '/all');
  }

  getByQuizId(quizId: number): Observable<any> {
    return this.http.get(this.baseUrl + '/findByQuiz/' + quizId);
  }

  insert(obj: any): Observable<any> {
    return this.http.post(this.baseUrl + '/insert', obj);
  }

}
