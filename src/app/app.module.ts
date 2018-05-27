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

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { QuizDetailComponent, AnswerInsertDialog } from './components/quiz-detail/quiz-detail.component';
import { LoginComponent } from './components/login/login.component';

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Interceptor } from "./core/app.interceptor";
import { TokenStorage } from "./core/token.storage";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuizzesComponent,
    QuizDetailComponent,
    HeaderComponent,
    FooterComponent,
    AnswerInsertDialog,
    LoginComponent,
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
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true
    }
  ],
  entryComponents: [
    AnswerInsertDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
