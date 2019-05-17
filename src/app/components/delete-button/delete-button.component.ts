import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { first, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {
  @Output() projectDeleted = new EventEmitter<string>();
  @Input() projectId: string;
  constructor(private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit() {}

  openDialog() {
    this.dialog
      .open(DeleteDialogComponent, {
        data: { projectId: this.projectId }
      })
      .afterClosed()
      .pipe(
        first(),
        tap(projectId => {
          if (projectId) {
            this.projectDeleted.emit(projectId);
          }
        })
      )
      .subscribe();
  }
}
