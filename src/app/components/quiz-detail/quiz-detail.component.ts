import { Component, OnInit, Inject } from '@angular/core';

import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';

import { Question } from '../models/question';
import { Answer } from '../models/answer';

import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  questions: Question[] = [];
  allExpandState = false;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.questionService.getByQuizId(id)
      .subscribe(data => {
        this.questions = data;
      },
      error => {
        console.log(<any>error);
      });
  }

  getAnswers(item): void {
    this.answerService.getByQuestionId(item.id)
      .subscribe(data => {
        item.answers = data;
      },
      error => {
        console.log(<any>error);
      });
  }

  deleteAnswer(question, answer): void {
    this.answerService.delete(answer.id)
      .subscribe(data => {
        question.answers = data;
        this.openSnackBar('Answer removed successfully', 'Close')
      },
      error => {
        console.log(<any>error);
      });
  }

  openDialog(quiz) {
    const dialogRef = this.dialog.open(AnswerInsertDialog, {
      data: { quiz: quiz },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      this.getAnswers(quiz);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'green',
    });
  }

}

@Component({
  selector: 'answer-insert-dialog',
  templateUrl: 'answer-insert-dialog.html',
})
export class AnswerInsertDialog implements OnInit {
  private quiz: Quiz = {};
  answer = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private answerService: AnswerService,
    public snackBar: MatSnackBar) {

    this.quiz = data.quiz;
    this.newAnswer();
  }

  ngOnInit(): void {

  }

  save() {
    console.log(this.answer);
    this.answerService.insert(this.answer)
      .subscribe(data => {
        console.log(data);
        this.newAnswer();
        this.openSnackBar('Answer saved successfully', 'Close')
      },
      error => {
        console.log(<any>error);
      });
  }

  newAnswer() {
    this.answer = {};
    this.answer.id = 0;
    this.answer.question = this.quiz.id;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'green',
    });
  }

}
