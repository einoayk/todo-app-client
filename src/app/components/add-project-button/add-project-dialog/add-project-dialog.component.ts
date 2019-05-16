import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { first } from 'rxjs/operators';
import { Project } from 'src/app/types';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {}

  ngOnInit() {
    this.form = this.createForm();
  }

  async handleSubmit() {
    try {
      this.submitting = true;

      const result = await this.apollo
        .mutate<Project>({
          mutation: gql`
            mutation ProjectDialogMutation($name: String!, $text: String!) {
              project: addProject(name: $name, text: $text) {
                name
                isReady
                text
              }
            }
          `,
          variables: { name: this.form.value.name, text: this.form.value.text }
        })
        .pipe(first())
        .toPromise();

      this.dialogRef.close(result.data.project);
    } catch (err) {
      console.error(err);
    }

    this.submitting = false;
  }

  private createForm() {
    return this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.min(1)]),
      text: this.fb.control(null, [Validators.required, Validators.min(1)])
    });
  }
}
