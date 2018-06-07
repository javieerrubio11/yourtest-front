import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';

import { Question } from '../../models/question';
import { Quiz } from '../../models/quiz';
import { Answer } from '../../models/answer';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  questions: Question[] = [];
  quiz: Quiz = null;
  responseQuestion = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private answerService: AnswerService,
    private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestions();
    this.getQuiz();
  }

  getQuestions(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.questionService.getByQuizId(id)
      .subscribe(data => {
        this.questions = data;
        this.completeQuestions();
      },
      error => {
        console.log(<any>error);
      });
  }

  completeQuestions(): void {
    let vm = this;
    this.questions.forEach(function(item) {
      vm.getAnswers(item);
    })
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

    selectAnswer(): void {
      console.log(this.responseQuestion)
    }

}
