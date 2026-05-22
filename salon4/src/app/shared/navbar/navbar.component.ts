import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="nav">
      <!-- ✅ LOGO + TITLE -->
      <div class="brand">
        <img src="/images/logo.png" alt="Logo" class="logo" />

        <h2>Salon Premium</h2>
      </div>

      <!-- ✅ LINKS -->
      <div class="links">
        <a routerLink="">Inicio</a>
        <a routerLink="/servicios">Servicios</a>
        <a routerLink="/reservar-cita">Reservar</a>
        <a routerLink="/login">Admin</a>
      </div>
    </nav>
  `,
  styles: [
    `
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        background: #0a0231;
        color: white;
      }

      /* ✅ BRAND */
      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      /* ✅ LOGO */
      .logo {
        width: 50px;
        height: 50px;
        object-fit: contain;
      }

      .brand h2 {
        margin: 0;
      }

      /* ✅ LINKS */
      .links a {
        margin: 0 10px;
        color: white;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s;
      }

      .links a:hover {
        color: gold;
      }
    `,
  ],
})
export class NavbarComponent {}
