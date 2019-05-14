import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AddProjectButtonComponent } from './add-project-button/add-project-button.component';
import { AddProjectDialogComponent } from './add-project-button/add-project-dialog/add-project-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { CompletedComponent } from './completed/completed.component';
import { GraphQLModule } from './graphql.module';
import { MaterialModule } from './material-module';
import { TodoComponent } from './todo/todo.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    TodoComponent,
    CompletedComponent,
    AddProjectButtonComponent,
    AddProjectDialogComponent
  ],
  entryComponents: [AddProjectDialogComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
