import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import Chart from 'chart.js/auto';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="dashboard">
      <aside class="sidebar">
        <div class="logo-box">
          <img src="/images/logo.png" alt="Logo" class="logo" />
          <h2>💈 Salon Admin</h2>
        </div>

        <a routerLink="/admin/clientes">👤 Clientes</a>
        <a routerLink="/admin/citas">📅 Citas</a>
        <a routerLink="/admin/servicios">✂️ Servicios</a>
        <a routerLink="/admin/facturas">🧾 Facturas</a>

        <button (click)="logout()">Logout</button>
      </aside>

      <main class="content">
        <div class="cards">
          <div class="card">
            <h3>Clientes</h3>
            <p>{{ clientes.length }}</p>
          </div>

          <div class="card">
            <h3>Citas</h3>
            <p>{{ citas.length }}</p>
          </div>

          <div class="card">
            <h3>Servicios</h3>
            <p>{{ servicios.length }}</p>
          </div>

          <div class="card">
            <h3>Facturas</h3>
            <p>{{ facturas.length }}</p>
          </div>
        </div>

        <div class="charts">
          <div class="chart-card">
            <h3>Estado de citas</h3>
            <canvas #citasCanvas></canvas>
          </div>

          <div class="chart-card">
            <h3>Servicios</h3>
            <canvas #serviciosCanvas></canvas>
          </div>
        </div>

        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .dashboard {
        display: flex;
        height: calc(100vh - 60px);
      }

      .sidebar {
        width: 240px;
        background: linear-gradient(180deg, #111, #1f1f1f);
        color: white;
        padding: 25px;
        display: flex;
        flex-direction: column;
      }

      .sidebar a {
        margin: 8px 0;
        padding: 10px;
        color: white;
        text-decoration: none;
        border-radius: 8px;
      }

      .sidebar a:hover {
        background: #ff512f;
      }

      .sidebar button {
        margin-top: auto;
        background: red;
        border: none;
        padding: 10px;
        border-radius: 8px;
        color: white;
      }

      .content {
        flex: 1;
        padding: 25px;
        background: #f4f6f9;
        overflow-y: auto;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
      }

      .card {
        background: white;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      }

      .card p {
        font-size: 28px;
        color: #ff512f;
        font-weight: bold;
      }

      .charts {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .chart-card {
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      }
    `,
  ],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('citasCanvas') citasCanvas!: ElementRef;
  @ViewChild('serviciosCanvas') serviciosCanvas!: ElementRef;

  clientes: any[] = [];
  citas: any[] = [];
  servicios: any[] = [];
  facturas: any[] = [];

  citasChart: any;
  serviciosChart: any;

  constructor(private api: ApiService) {}

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    this.api.getClientes().subscribe((res: any) => {
      this.clientes = res.member;
    });

    this.api.getCitas().subscribe((res: any) => {
      this.citas = res.member;
      setTimeout(() => this.createCitasChart(), 100);
    });

    this.api.getServicios().subscribe((res: any) => {
      this.servicios = res.member;
      setTimeout(() => this.createServiciosChart(), 100);
    });

    this.api.getFacturas().subscribe((res: any) => {
      this.facturas = res.member;
    });
  }

  // 🔥 FIX CHART BUG
  createCitasChart() {
    if (this.citasChart) {
      this.citasChart.destroy();
    }

    const pendientes = this.citas.filter((c) => c.estado === 'pendiente').length;
    const confirmadas = this.citas.filter((c) => c.estado === 'confirmada').length;

    this.citasChart = new Chart(this.citasCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Pendiente', 'Confirmada'],
        datasets: [
          {
            data: [pendientes, confirmadas],
            backgroundColor: ['#ff9800', '#4caf50'],
          },
        ],
      },
    });
  }

  createServiciosChart() {
    if (this.serviciosChart) {
      this.serviciosChart.destroy();
    }

    this.serviciosChart = new Chart(this.serviciosCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.servicios.map((s) => s.nombre_servicio),
        datasets: [
          {
            label: 'Precio (€)',
            data: this.servicios.map((s) => s.costo),
            backgroundColor: '#ff512f',
          },
        ],
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }
}
