import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Project } from '../../types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Output() marked: EventEmitter<any> = new EventEmitter();
  user: firebase.User;
  projectsData: Observable<ApolloQueryResult<Project[]>>;
  projectsQuery: QueryRef<Project[]>;

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.projectsQuery = this.getTodoPorjectsQuery();
    this.projectsData = this.projectsQuery.valueChanges;
  }

  refetch() {
    this.projectsQuery.refetch();
  }

  markedAsCompleted() {
    this.refetch();
    this.marked.emit(true);
  }

  private getTodoPorjectsQuery() {
    return this.apollo.watchQuery<Project[]>({
      query: gql`
        query TodoProjectsQuery {
          todoProjects {
            id
            name
            isReady
            text
          }
        }
      `,
      fetchPolicy: 'cache-first'
    });
  }
}
