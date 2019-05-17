import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { first } from 'rxjs/operators';
import { Project } from 'src/app/types';

@Component({
  selector: 'app-mark-as-completed-dialog',
  templateUrl: './mark-as-completed-dialog.component.html',
  styleUrls: ['./mark-as-completed-dialog.component.css']
})
export class MarkAsCompletedDialogComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private dialogRef: MatDialogRef<MarkAsCompletedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: string }
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  async handleSubmit() {
    try {
      this.submitting = true;

      const result = await this.apollo
        .mutate<Project>({
          mutation: gql`
            mutation MarkProjectAsCompletedMutation($projectId: String!) {
              project: markProjectAsCompleted(projectId: $projectId) {
                name
                isReady
                text
              }
            }
          `,
          variables: { projectId: this.data.projectId }
        })
        .pipe(first())
        .toPromise();

      this.dialogRef.close(result.data.project);
    } catch (err) {
      console.error(err);
    }
  }
}
