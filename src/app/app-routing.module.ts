import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { QuizzesComponent }  from './components/quizzes/quizzes.component';
import { QuizDetailComponent }  from './components/quiz-detail/quiz-detail.component';
import { ExamComponent }  from './components/exam/exam.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singin', component: SigninComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'quizzes', component: QuizzesComponent, canActivate: [AuthGuard] },
  { path: 'quiz-detail/:id', component: QuizDetailComponent, canActivate: [AuthGuard] },

  { path: 'exam/:id', component: ExamComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
