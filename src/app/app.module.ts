import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { rootRouterConfig } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectButtonComponent } from './components/add-project-button/add-project-button.component';
import { AddProjectDialogComponent } from './components/add-project-button/add-project-dialog/add-project-dialog.component';
import { CompletedComponent } from './components/completed/completed.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { DeleteDialogComponent } from './components/delete-button/delete-dialog/delete-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { MarkAsCompletedButtonComponent } from './components/mark-as-completed-button/mark-as-completed-button.component';
import { MarkAsCompletedDialogComponent } from './components/mark-as-completed-button/mark-as-completed-dialog/mark-as-completed-dialog.component';
import { TodoComponent } from './components/todo/todo.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserComponent } from './components/user/user.component';
import { GraphQLModule } from './graphql.module';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { MaterialModule } from './material.module';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './services/token-intercept.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    TodoComponent,
    CompletedComponent,
    AddProjectButtonComponent,
    AddProjectDialogComponent,
    UserComponent,
    MarkAsCompletedButtonComponent,
    MarkAsCompletedDialogComponent,
    DeleteButtonComponent,
    DeleteDialogComponent
  ],
  entryComponents: [
    AddProjectDialogComponent,
    MarkAsCompletedDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, TokenInterceptor, AuthGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
