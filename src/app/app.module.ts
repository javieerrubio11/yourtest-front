// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';

// Externar resources
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Services
import { QuizService } from './services/quiz.service';
import { QuestionService } from './services/question.service';
import { AnswerService } from './services/answer.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';

// Security
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Interceptor } from "./core/app.interceptor";
import { TokenStorage } from "./core/token.storage";
import { TokenJwtHelper } from "./core/token.jwthelper";

// Pipes
import { RandomOrderPipe } from './pipes/random-order.pipe';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuizzesComponent, QuizInsertDialog } from './components/quizzes/quizzes.component';
import { QuizDetailComponent, AnswerInsertDialog } from './components/quiz-detail/quiz-detail.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionDetailComponent, QuestionInsertDialog } from './components/question-detail/question-detail.component';
import { ExamComponent } from './components/exam/exam.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [
    RandomOrderPipe,

    AppComponent,
    DashboardComponent,
    QuizzesComponent,
    QuizDetailComponent,
    HeaderComponent,
    FooterComponent,
    QuizInsertDialog,
    AnswerInsertDialog,
    QuestionInsertDialog,
    LoginComponent,
    QuestionDetailComponent,
    ExamComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
  ],
  providers: [
    QuizService,
    QuestionService,
    AnswerService,
    AuthService,
    AuthGuardService,
    TokenStorage,
    TokenJwtHelper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true
    }
  ],
  entryComponents: [
    QuizInsertDialog,
    AnswerInsertDialog,
    QuestionInsertDialog,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
