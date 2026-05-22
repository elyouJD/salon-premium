import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'token';

  set(token: string) {
    localStorage.setItem(this.key, token);
  }

  get(): string | null {
    return localStorage.getItem(this.key);
  }

  remove() {
    localStorage.removeItem(this.key);
  }

  isLogged(): boolean {
    return !!this.get();
  }
}
