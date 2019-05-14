import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { first, tap } from 'rxjs/operators';
import { LoginService } from '../auth/login.service';
import { Project } from '../types';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-add-project-button',
  templateUrl: './add-project-button.component.html',
  styleUrls: ['./add-project-button.component.css']
})
export class AddProjectButtonComponent implements OnInit {
  @Output() projectCreated = new EventEmitter<Project>();
  user: firebase.User;

  constructor(private dialog: MatDialog, private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.getLoggedInUser().subscribe(user => {
      this.user = user;
    });
  }

  openDialog() {
    this.dialog
      .open(AddProjectDialogComponent, { data: { userId: this.user.uid } })
      .afterClosed()
      .pipe(
        first(),
        tap(project => {
          if (project) {
            this.projectCreated.emit(project);
          }
        })
      )
      .subscribe();
  }
}
