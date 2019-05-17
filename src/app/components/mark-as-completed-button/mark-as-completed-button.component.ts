import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { first, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Project } from 'src/app/types';
import { MarkAsCompletedDialogComponent } from './mark-as-completed-dialog/mark-as-completed-dialog.component';

@Component({
  selector: 'app-mark-as-completed-button',
  templateUrl: './mark-as-completed-button.component.html',
  styleUrls: ['./mark-as-completed-button.component.css']
})
export class MarkAsCompletedButtonComponent implements OnInit {
  @Output() markedAsCompleted = new EventEmitter<Project>();
  @Input() projectId: string;
  constructor(private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit() {}

  openDialog() {
    this.dialog
      .open(MarkAsCompletedDialogComponent, {
        data: { projectId: this.projectId }
      })
      .afterClosed()
      .pipe(
        first(),
        tap(project => {
          if (project) {
            this.markedAsCompleted.emit(project);
          }
        })
      )
      .subscribe();
  }
}
