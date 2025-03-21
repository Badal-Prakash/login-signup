import { AuthService } from './../shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
})
export class DashBoardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogout(): void {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }
}
