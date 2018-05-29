import { Component, OnInit, Inject } from '@angular/core';

import { Question } from '../../models/question';
import { Quiz } from '../../models/quiz';

import { QuestionService } from '../../services/question.service';
import { AuthService } from '../../services/auth.service';

import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}



@Component({
  selector: 'question-insert-dialog',
  templateUrl: 'question-insert-dialog.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionInsertDialog implements OnInit {

  question = null;
  private activeUser = null;
  private quiz: Quiz = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService,
    private authService: AuthService,
    public snackBar: MatSnackBar) {

    this.quiz = data.quiz;
    this.activeUser = this.authService.activeUser;
    this.newQuestion();
  }

  ngOnInit(): void {

  }

  save() {
    this.questionService.insert(this.question)
      .subscribe(data => {
        this.newQuestion();
        this.openSnackBar('Question saved successfully', 'Close')
      },
      error => {
        console.log(<any>error);
      });
  }

  newQuestion() {
    this.question = {};
    this.question['id'] = 0;
    this.question['owner'] = this.activeUser.id;
    this.question['quiz'] = this.quiz.id;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'green',
    });
  }

}
