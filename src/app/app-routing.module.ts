import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { QuizzesComponent }  from './components/quizzes/quizzes.component';
import { QuizDetailComponent }  from './components/quiz-detail/quiz-detail.component';
import { ExamComponent }  from './components/exam/exam.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'quiz-detail/:id', component: QuizDetailComponent },
  { path: 'exam/:id', component: ExamComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
