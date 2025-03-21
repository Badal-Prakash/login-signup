import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../constants';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseURL = 'http://localhost:5172/api';
  createUser(formData: any) {
    return this.http.post(this.baseURL + '/signup', formData);
  }
  loginUser(formData: any) {
    return this.http.post(this.baseURL + '/signin', formData);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null ? true : false;
  }
  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
