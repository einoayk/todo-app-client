import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/login.service';
import { Project } from '../types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  user: firebase.User;
  projectsData: Observable<ApolloQueryResult<Project[]>>;
  projectsQuery: QueryRef<Project[]>;

  constructor(private apollo: Apollo, private loginService: LoginService) {}

  ngOnInit() {
    this.getUserAndInitData();
  }

  getUserAndInitData() {
    this.loginService.getLoggedInUser().subscribe(user => {
      this.user = user;
      console.log(user);
      if (user) {
        console.log('kakka');
        this.initData();
      }
    });
  }

  initData() {
    this.projectsQuery = this.getTodoPorjectsQuery();
    this.projectsData = this.projectsQuery.valueChanges;
  }

  refetch() {
    this.projectsQuery.refetch();
  }

  getTodoPorjectsQuery() {
    return this.apollo.watchQuery<Project[]>({
      query: gql`
        query TodoProjectsQuery {
          todoProjects {
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
