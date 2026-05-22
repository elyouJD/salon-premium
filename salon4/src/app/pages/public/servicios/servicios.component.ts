import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="services">
      <h2>Nuestros Servicios</h2>

      <div class="cards">
        <div class="card" *ngFor="let s of servicios">
          <img [src]="s.img" />

          <div class="content">
            <h3>{{ s.nombre }}</h3>
            <p>{{ s.descripcion }}</p>

            <div class="footer">
              <span class="price">{{ s.precio }}€</span>

              <!-- 🔥 زر خدام -->
              <button
                [routerLink]="['/reservar-cita']"
                [queryParams]="{ servicio: s.nombre }"
                class="btn"
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section class="contact">
      <h2>Contacto</h2>

      <div class="contact-box">
        <p>📍 Calle Barbería 123, Madrid</p>
        <p>📞 +34 600 123 456</p>
        <p>📧 salon@email.com</p>

        <div class="socials">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">WhatsApp</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      /* SERVICES */
      .services {
        padding: 60px 30px;
        background: #f5f6fa;
        text-align: center;
      }

      h2 {
        font-size: 32px;
        margin-bottom: 40px;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 25px;
      }

      .card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        transition: 0.3s;
      }

      .card:hover {
        transform: translateY(-10px);
      }

      .card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
      }

      .content {
        padding: 15px;
        text-align: left;
      }

      h3 {
        margin: 10px 0;
      }

      p {
        font-size: 14px;
        color: #555;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
      }

      .price {
        font-weight: bold;
        color: #ff512f;
        font-size: 18px;
      }

      .btn {
        background: #111;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.3s;
      }

      .btn:hover {
        background: #ff512f;
      }

      /* CONTACT */
      .contact {
        background: #111;
        color: white;
        text-align: center;
        padding: 50px 20px;
      }

      .contact-box {
        margin-top: 20px;
        line-height: 2;
      }

      .socials {
        margin-top: 20px;
      }

      .socials a {
        margin: 0 10px;
        color: #ff512f;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s;
      }

      .socials a:hover {
        color: white;
      }
    `,
  ],
})
export class ServiciosComponent {
  servicios = [
    {
      nombre: 'Corte',
      descripcion: 'Corte moderno y profesional',
      precio: 10,
      img: 'images/img1.jpg',
    },
    {
      nombre: 'Barba',
      descripcion: 'Arreglo perfecto de barba',
      precio: 5,
      img: 'images/img2.jpg',
    },
    {
      nombre: 'Corte + Barba',
      descripcion: 'Look completo',
      precio: 15,
      img: 'images/img3.jpg',
    },
  ];
}
