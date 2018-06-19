import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { QuizzesComponent }  from './components/quizzes/quizzes.component';
import { QuizDetailComponent }  from './components/quiz-detail/quiz-detail.component';
import { ExamComponent }  from './components/exam/exam.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'quizzes', component: QuizzesComponent, canActivate: [AuthGuard] },
  { path: 'quiz-detail/:id', component: QuizDetailComponent },
  { path: 'exam/:id', component: ExamComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
