import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,

  template: `
    <footer class="footer">
      <div class="footer-content">
        <!-- BRAND -->

        <div class="brand">
          <img src="/images/logo.png" alt="Logo" class="logo" />

          <h2>Salon Premium</h2>

          <p>Tu salón moderno para citas, belleza y estilo ✨</p>
        </div>

        <!-- LINKS -->

        <div class="links">
          <h3>Enlaces</h3>

          <a href="/">Inicio</a>

          <a href="/servicios">Servicios</a>

          <a href="/reservar-cita"> Reservar </a>

          <a href="/login"> Admin </a>
        </div>

        <!-- CONTACT -->

        <div class="contact">
          <h3>Contacto</h3>

          <p>📍 España</p>

          <p>📞 +34 600 000 000</p>

          <p>✉️ salonpremium@gmail.com</p>
        </div>
      </div>

      <!-- BOTTOM -->

      <div class="bottom">© 2026 Salon Premium - All rights reserved</div>
    </footer>
  `,

  styles: [
    `
      * {
        box-sizing: border-box;
      }

      .footer {
        background: linear-gradient(180deg, #0a0231, #14044d);

        color: white;

        margin-top: 60px;

        padding-top: 50px;
      }

      /* CONTENT */

      .footer-content {
        display: grid;

        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

        gap: 40px;

        padding: 0 40px 40px;
      }

      /* BRAND */

      .brand {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .logo {
        width: 70px;
        height: 70px;

        border-radius: 50%;

        object-fit: cover;
      }

      .brand h2 {
        margin: 0;

        font-size: 26px;
      }

      .brand p {
        color: #d1d5db;

        line-height: 1.6;
      }

      /* TITLES */

      .links h3,
      .contact h3 {
        margin-bottom: 15px;

        font-size: 20px;

        color: gold;
      }

      /* LINKS */

      .links {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .links a {
        color: #f1f5f9;

        text-decoration: none;

        transition: 0.3s;
      }

      .links a:hover {
        color: gold;

        transform: translateX(4px);
      }

      /* CONTACT */

      .contact {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .contact p {
        margin: 0;

        color: #e2e8f0;
      }

      /* BOTTOM */

      .bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);

        text-align: center;

        padding: 18px;

        font-size: 14px;

        color: #cbd5e1;
      }

      /* MOBILE */

      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;

          text-align: center;

          padding: 0 20px 35px;
        }

        .brand {
          align-items: center;
        }

        .links,
        .contact {
          align-items: center;
        }
      }

      /* SMALL MOBILE */

      @media (max-width: 480px) {
        .brand h2 {
          font-size: 22px;
        }

        .links h3,
        .contact h3 {
          font-size: 18px;
        }
      }
    `,
  ],
})
export class FooterComponent {}
