import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [RouterLink, CommonModule],

  template: `
    <nav class="nav">
      <!-- LOGO -->
      <div class="brand">
        <img src="/images/logo.png" alt="Logo" class="logo" />

        <h2>Salon Premium</h2>
      </div>

      <!-- MENU BUTTON MOBILE -->
      <div class="menu-btn" (click)="toggleMenu()">☰</div>

      <!-- LINKS -->
      <div class="links" [class.active]="menuOpen">
        <a routerLink="" (click)="closeMenu()"> Inicio </a>

        <a routerLink="/servicios" (click)="closeMenu()"> Servicios </a>

        <a routerLink="/reservar-cita" (click)="closeMenu()"> Reservar </a>

        <a routerLink="/login" (click)="closeMenu()"> Admin </a>
      </div>
    </nav>
  `,

  styles: [
    `
      * {
        box-sizing: border-box;
      }

      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 14px 30px;

        background: linear-gradient(90deg, #0a0231, #14044d);

        color: white;

        position: sticky;
        top: 0;

        z-index: 999;

        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      }

      /* BRAND */

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .logo {
        width: 52px;
        height: 52px;

        object-fit: contain;

        border-radius: 50%;
      }

      .brand h2 {
        margin: 0;

        font-size: 24px;
        font-weight: bold;
      }

      /* LINKS */

      .links {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .links a {
        color: white;

        text-decoration: none;

        font-weight: 600;

        transition: 0.3s;

        position: relative;
      }

      .links a:hover {
        color: gold;
      }

      .links a::after {
        content: '';

        position: absolute;

        left: 0;
        bottom: -5px;

        width: 0;
        height: 2px;

        background: gold;

        transition: 0.3s;
      }

      .links a:hover::after {
        width: 100%;
      }

      /* MENU BUTTON */

      .menu-btn {
        display: none;

        font-size: 28px;

        cursor: pointer;

        user-select: none;
      }

      /* MOBILE */

      @media (max-width: 768px) {
        .nav {
          padding: 14px 18px;
        }

        .brand h2 {
          font-size: 20px;
        }

        .menu-btn {
          display: block;
        }

        .links {
          position: absolute;

          top: 78px;
          left: 0;

          width: 100%;

          background: #0a0231;

          flex-direction: column;

          align-items: center;

          gap: 18px;

          padding: 25px 0;

          display: none;

          animation: fadeMenu 0.3s ease;
        }

        .links.active {
          display: flex;
        }

        .links a {
          font-size: 17px;
        }
      }

      @keyframes fadeMenu {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* SMALL MOBILE */

      @media (max-width: 480px) {
        .logo {
          width: 45px;
          height: 45px;
        }

        .brand h2 {
          font-size: 18px;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
