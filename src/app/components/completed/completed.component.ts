import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Project } from '../../types';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  user: firebase.User;
  projectsData: Observable<ApolloQueryResult<Project[]>>;
  projectsQuery: QueryRef<Project[]>;

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.projectsQuery = this.getCompletedPorjectsQuery();
    this.projectsData = this.projectsQuery.valueChanges;
  }

  refetch() {
    this.projectsQuery.refetch();
  }

  getCompletedPorjectsQuery() {
    return this.apollo.watchQuery<Project[]>({
      query: gql`
        query completedProjectsQuery {
          completedProjects {
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
