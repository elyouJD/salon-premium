import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  login(data: { username: string; password: string }) {
    return this.http.post<any>('http://localhost:8000/auth', data);
  }

  saveToken(token: string) {
    this.tokenService.set(token);
  }

  logout() {
    this.tokenService.remove();
  }

  isLogged() {
    return this.tokenService.isLogged();
  }
}
