import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: Observable<firebase.User>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.currentUser();
  }

  logout() {
    this.authService.logout();
  }

  currentUser() {
    return this.authService.getLoggedInUser();
  }
}
