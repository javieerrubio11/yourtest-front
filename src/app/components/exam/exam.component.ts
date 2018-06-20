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
  examResolved = [];
  correctAnswer = 0;
  formResolved = false;
  formValid = false;

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

  checkForm(): void {
    let vm = this;
    let valid = true;
    this.questions.forEach(function(item) {
      if(!vm.responseQuestion[item.id]) {
        valid = false;
        return;
      }
    })
    this.formValid = valid;
  }

  resolveExam(): void {
    console.log(this.responseQuestion)
    let vm = this;

    vm.correctAnswer = 0;
    vm.formResolved = true;
    this.questions.forEach(function(item) {
      let answerSelected = vm.responseQuestion[item.id];
      let answerSelectedObject = vm.searchById(item.answers, answerSelected);

      let questionResolved = {};
      questionResolved['correct'] = answerSelectedObject.correct;
      questionResolved['answer'] = answerSelected;
      vm.examResolved[item.id] = questionResolved;

      if(answerSelectedObject.correct)
        vm.correctAnswer++;

      console.log(item, answerSelected, answerSelectedObject, questionResolved);
    })

  }

  searchQuestionById(id): Question {
    return this.questions.find(function(element) {
      return element.id == id;
    });
  }

 convertToNumberingScheme(number): String {
   var baseChar = ("A").charCodeAt(0),
       letters  = "";

   do {
     number -= 1;
     letters = String.fromCharCode(baseChar + (number % 26)) + letters;
     number = (number / 26) >> 0; // quick `floor`
   } while(number > 0);

   return letters;
 }

  searchById(list, id): any {
    return list.find(function(element) {
      return element.id == id;
    });
  }

}
