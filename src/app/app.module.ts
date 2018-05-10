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
import { UserService } from './services/user.service';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { QuizDetailComponent, AnswerInsertDialog } from './components/quiz-detail/quiz-detail.component';

// Authentication
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { TOKEN_NAME } from './services/auth.constant';
import { AppDataService } from './services/app-data.service';
import { Http, HttpModule} from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuizzesComponent,
    QuizDetailComponent,
    HeaderComponent,
    FooterComponent,
    AnswerInsertDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    HttpModule,
  ],
  providers: [
    QuizService,
    QuestionService,
    AnswerService,
    UserService,
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
  ],
  entryComponents: [
    AnswerInsertDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
