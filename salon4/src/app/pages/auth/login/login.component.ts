import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../..//core/services/api.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <!-- LEFT IMAGE -->
      <div class="left">
        <img src="images/img1.jpg" />
      </div>

      <!-- RIGHT -->
      <div class="right">
        <div class="login-card">
          <h2>💇 Admin Panel</h2>
          <p>Acceso al sistema</p>

          <form (ngSubmit)="login()">
            <div class="input-group">
              <input type="text" [(ngModel)]="user" name="user" placeholder="Usuario" required />
            </div>

            <div class="input-group">
              <input
                type="password"
                [(ngModel)]="pass"
                name="pass"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit">Entrar</button>
          </form>

          <small class="hint"> demo: admin / 123456 </small>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100vh;
        font-family: 'Poppins', sans-serif;
      }

      /* LEFT IMAGE */
      .left img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* RIGHT SIDE */
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        background: radial-gradient(circle at top, #1f1c2c, #09040f);
      }

      /* CARD */
      .login-card {
        width: 340px;
        padding: 40px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
        text-align: center;
        color: #fff;
        animation: fadeIn 0.8s ease;
      }

      h2 {
        margin-bottom: 8px;
        font-weight: 600;
      }

      p {
        margin-bottom: 25px;
        font-size: 14px;
        opacity: 0.7;
      }

      .input-group {
        margin-bottom: 18px;
      }

      input {
        width: 100%;
        padding: 13px;
        border-radius: 12px;
        border: none;
        outline: none;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      input::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }

      input:focus {
        box-shadow: 0 0 0 2px #ff7a18;
        background: rgba(255, 255, 255, 0.15);
      }

      button {
        width: 100%;
        padding: 13px;
        border-radius: 12px;
        border: none;
        background: linear-gradient(135deg, #ff7a18, #ff512f);
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
      }

      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(255, 81, 47, 0.6);
      }

      .hint {
        display: block;
        margin-top: 18px;
        font-size: 12px;
        opacity: 0.5;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* MOBILE */
      @media (max-width: 768px) {
        .login-container {
          grid-template-columns: 1fr;
        }

        .left {
          display: none;
        }

        .login-card {
          width: 90%;
        }
      }
    `,
  ],
})
export class LoginComponent {
  user = '';
  pass = '';

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  /*login() {
    this.api.getAdmins().subscribe((res: any) => {
      const admins = res.member;

      const admin = admins.find((a: any) => a.usuario === this.user);

      if (!admin) {
        alert('❌ Usuario no existe');
        return;
      }

      // TEMP login
      if (this.pass !== '123456') {
        alert('❌ Password incorrecto');
        return;
      }

      localStorage.setItem('token', 'admin');
      this.router.navigate(['/admin']);
    });
  }*/
  login() {
    this.api.getAdmins().subscribe((res: any) => {
      const admins = res.member || [];

      const admin = admins.find((a: any) => a.usuario === this.user);

      if (!admin) {
        alert('❌ Usuario no existe');
        return;
      }

      // TEMP PASSWORD
      if (this.pass !== '123456') {
        alert('❌ Password incorrecto');
        return;
      }

      localStorage.setItem('token', 'admin');

      localStorage.setItem('admin', JSON.stringify(admin));

      this.router.navigate(['/admin']);
    });
  }
}
