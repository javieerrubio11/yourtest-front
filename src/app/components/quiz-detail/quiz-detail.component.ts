import { Component, OnInit, Inject } from '@angular/core';

import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';

import { Question } from '../../models/question';
import { Quiz } from '../../models/quiz';
import { Answer } from '../../models/answer';

import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { QuestionInsertDialog } from '../question-detail/question-detail.component';


@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  questions: Question[] = [];
  allExpandState = false;
  quiz: Quiz = null;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getQuestions();
    this.getQuiz();
  }

  getQuestions(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.questionService.getByQuizId(id)
      .subscribe(data => {
        this.questions = data;
      },
      error => {
        console.log(<any>error);
      });
  }

  getQuiz(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getOne(id)
      .subscribe(data => {
        this.quiz = data;
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
        this.openSnackBar('Answer removed successfully', 'Close');
      },
      error => {
        console.log(<any>error);
      });
  }

  deleteQuestion(id): void {
    this.questionService.delete(id)
      .subscribe(data => {
        this.questions = data;
        this.openSnackBar('Question removed successfully', 'Close');
      },
      error => {
        console.log(<any>error);
      });
  }

  openDialog(question) {
    const dialogRef = this.dialog.open(AnswerInsertDialog, {
      data: { question: question },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAnswers(question);
    });
  }

  openDialogQuestion() {
    const dialogRef = this.dialog.open(QuestionInsertDialog, {
      data: { quiz: this.quiz },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getQuestions();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: 'green',
    });
  }

}

@Component({
  selector: 'answer-insert-dialog',
  templateUrl: 'answer-insert-dialog.html',
  styleUrls: ['./quiz-detail.component.css'],
})
export class AnswerInsertDialog implements OnInit {
  question: Question = null;
  answer = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private answerService: AnswerService,
    public snackBar: MatSnackBar) {

    this.question = data.question;
    this.newAnswer();
  }

  ngOnInit(): void {

  }

  save() {
    this.answerService.insert(this.answer)
      .subscribe(data => {
        this.newAnswer();
        this.openSnackBar('Answer saved successfully', 'Close');
      },
      error => {
        console.log(<any>error);
      });
  }

  newAnswer() {
    this.answer = {};
    this.answer["id"] = 0;
    this.answer["question"] = this.question.id;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: 'green',
    });
  }

}
