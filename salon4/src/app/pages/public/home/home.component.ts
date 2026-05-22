import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- HERO -->
    <div class="hero">
      <img class="bg" src="images/img1.jpg" />

      <div class="overlay">
        <h1>💇‍♂️ Salon Premium</h1>

        <p>Reserva tu cita en segundos y disfruta de una experiencia profesional</p>

        <button routerLink="/reservar-cita" class="btn">Reservar ahora</button>
      </div>
    </div>

    <!-- SERVICES -->
    <section class="services">
      <h2>Nuestros Servicios</h2>

      <div class="cards">
        <div class="card">
          <img [src]="'images/img1.jpg'" />
          <h3>Corte</h3>
          <p>Estilo moderno y profesional</p>
        </div>

        <div class="card">
          <img [src]="'images/img2.jpg'" />
          <h3>Barba</h3>
          <p>Cuidado perfecto de tu barba</p>
        </div>

        <div class="card">
          <img [src]="'images/img3.jpg'" />
          <h3>Corte + Barba</h3>
          <p>Look completo</p>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section class="contact">
      <h2>Contacto</h2>
      <p>📍 Dirección: Calle Barbería 123</p>
      <p>📞 Teléfono: +34 600 123 456</p>
    </section>
  `,
  styles: [
    `
      /* HERO */
      .hero {
        position: relative;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }

      /* background image */
      .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
      }

      /* overlay */
      .overlay {
        position: relative;
        z-index: 1;
        background: rgba(0, 0, 0, 0.6);
        padding: 40px;
        border-radius: 20px;
        color: white;
        text-align: center;
        animation: fadeIn 0.8s ease;
      }

      h1 {
        font-size: 42px;
        margin-bottom: 15px;
      }

      p {
        margin-bottom: 20px;
      }

      .btn {
        background: linear-gradient(135deg, #ff7a18, #ff512f);
        padding: 12px 25px;
        border-radius: 10px;
        border: none;
        color: white;
        cursor: pointer;
        transition: 0.3s;
      }

      .btn:hover {
        transform: scale(1.1);
      }

      /* SERVICES */
      .services {
        padding: 50px;
        text-align: center;
        background: #f5f6fa;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 30px;
      }

      .card {
        background: white;
        border-radius: 15px;
        padding: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: 0.3s;
      }

      .card:hover {
        transform: translateY(-10px);
      }

      .card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 10px;
      }

      /* CONTACT */
      .contact {
        background: #111;
        color: white;
        text-align: center;
        padding: 40px;
      }

      /* animation */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class HomeComponent {}
