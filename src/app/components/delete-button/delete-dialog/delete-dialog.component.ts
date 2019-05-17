import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: string }
  ) {}

  ngOnInit() {}

  async handleSubmit() {
    try {
      this.submitting = true;

      const result = await this.apollo
        .mutate<string>({
          mutation: gql`
            mutation DeleteProjectMutation($projectId: String!) {
              project: deleteProject(projectId: $projectId)
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
