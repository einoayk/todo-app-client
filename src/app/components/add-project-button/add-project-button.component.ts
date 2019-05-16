import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { first, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Project } from '../../types';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-add-project-button',
  templateUrl: './add-project-button.component.html',
  styleUrls: ['./add-project-button.component.css']
})
export class AddProjectButtonComponent implements OnInit {
  @Output() projectCreated = new EventEmitter<Project>();

  constructor(private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit() {}

  openDialog() {
    this.dialog
      .open(AddProjectDialogComponent)
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
