import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserProfile() {
    const token = this.authService.getToken();
    console.log(token);
    const reqHeader = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(environment.baseURL + '/UserProfile');
  }
}
