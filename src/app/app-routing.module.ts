import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { QuizzesComponent }  from './components/quizzes/quizzes.component';
import { QuizDetailComponent }  from './components/quiz-detail/quiz-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'quiz-detail/:id', component: QuizDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}