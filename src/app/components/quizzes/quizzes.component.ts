import { Component, OnInit, Inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { AuthService } from '../../services/auth.service';
import { Quiz } from '../../models/quiz';

import { MatDialog } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(
    private quizService: QuizService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getQuizzes();
  }

  getQuizzes(): void {
    this.quizService.getAll()
      .subscribe(data => {
        this.quizzes = data;
      },
      error => {
        console.log(<any>error);
      });
  }

  openDialogQuiz() {
    const dialogRef = this.dialog.open(QuizInsertDialog, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.quizzes.push(result)
    });
  }

}



@Component({
  selector: 'quiz-insert-dialog',
  templateUrl: 'quiz-insert-dialog.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizInsertDialog implements OnInit {

  quiz = null;
  private activeUser = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<QuizInsertDialog>,
    private quizService: QuizService,
    private authService: AuthService,
    public snackBar: MatSnackBar) {

    this.activeUser = this.authService.activeUser;
    this.newQuiz();
  }

  ngOnInit(): void {

  }

  save() {
    this.quizService.insert(this.quiz)
      .subscribe(data => {
        this.openSnackBar('Quiz saved successfully', 'Close')
        this.dialogRef.close(data);
      },
      error => {
        console.log(<any>error);
      });
  }

  newQuiz() {
    this.quiz = {};
    this.quiz['id'] = 0;
    this.quiz['owner'] = this.activeUser.id;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'green',
    });
  }

}

