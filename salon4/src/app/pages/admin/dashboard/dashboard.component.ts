import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

import { CommonModule } from '@angular/common';

import { ApiService } from '../../../core/services/api.service';

import Chart from 'chart.js/auto';

@Component({
  standalone: true,

  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],

  template: `
    <div class="dashboard">
      <!-- SIDEBAR -->

      <aside class="sidebar">
        <div class="logo-box">
          <img src="/images/logo.png" alt="Logo" class="logo" />

          <h2>💈 Salon Admin</h2>
        </div>

        <div class="menu">
          <a [routerLink]="['/admin/clientes']" routerLinkActive="active">
            👤 <span>Clientes</span>
          </a>

          <a [routerLink]="['/admin/citas']" routerLinkActive="active"> 📅 <span>Citas</span> </a>

          <a [routerLink]="['/admin/servicios']" routerLinkActive="active">
            ✂️ <span>Servicios</span>
          </a>

          <a [routerLink]="['/admin/facturas']" routerLinkActive="active">
            🧾 <span>Facturas</span>
          </a>
        </div>

        <button class="logout-btn" (click)="logout()">Logout</button>
      </aside>

      <!-- CONTENT -->

      <main class="content">
        <!-- CARDS -->

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

        <!-- CHARTS -->

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

        <!-- ROUTER -->

        <div class="router-page">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,

  styles: [
    `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: Arial, Helvetica, sans-serif;
      }

      .dashboard {
        display: flex;
        min-height: 100vh;
        background: #eef2f7;
      }

      /* SIDEBAR */

      .sidebar {
        width: 240px;
        height: 100vh;

        background: linear-gradient(180deg, #0f172a 0%, #111827 50%, #1e293b 100%);

        color: white;

        padding: 18px 16px;

        display: flex;
        flex-direction: column;

        position: sticky;
        top: 0;

        box-shadow: 0 0 25px rgba(0, 0, 0, 0.12);

        overflow: hidden;
      }

      .logo-box {
        text-align: center;
        margin-bottom: 25px;
      }

      .logo {
        width: 72px;
        height: 72px;

        border-radius: 50%;

        object-fit: cover;

        border: 3px solid rgba(255, 255, 255, 0.15);

        margin-bottom: 12px;
      }

      .logo-box h2 {
        font-size: 22px;
        font-weight: 700;
        color: white;
      }

      /* MENU */

      .menu {
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex: 1;
      }

      .sidebar a {
        display: flex;
        align-items: center;
        gap: 14px;

        padding: 14px 16px;

        border-radius: 14px;

        text-decoration: none;

        color: #d1d5db;

        font-size: 15px;
        font-weight: 500;

        transition: all 0.25s ease;
      }

      .sidebar a:hover {
        background: linear-gradient(90deg, #2563eb, #4f46e5);

        color: white;

        transform: translateX(4px);
      }

      .sidebar a.active {
        background: linear-gradient(90deg, #2563eb, #4f46e5);

        color: white;
      }

      /* LOGOUT */

      .logout-btn {
        background: linear-gradient(90deg, #ef4444, #dc2626);

        border: none;

        padding: 13px;

        border-radius: 14px;

        color: white;

        font-size: 15px;
        font-weight: 600;

        cursor: pointer;

        transition: 0.3s;

        margin-top: 15px;
      }

      .logout-btn:hover {
        transform: translateY(-2px);
        opacity: 0.95;
      }

      /* CONTENT */

      .content {
        flex: 1;
        padding: 24px;
        overflow-x: hidden;
      }

      /* CARDS */

      .cards {
        display: grid;

        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

        gap: 20px;

        margin-bottom: 25px;
      }

      .card {
        background: white;

        padding: 26px;

        border-radius: 22px;

        text-align: center;

        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

        transition: 0.3s;
      }

      .card:hover {
        transform: translateY(-5px);
      }

      .card h3 {
        color: #475569;
        margin-bottom: 12px;
        font-size: 18px;
      }

      .card p {
        font-size: 34px;
        font-weight: bold;
        color: #2563eb;
      }

      /* CHARTS */

      .charts {
        display: grid;

        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

        gap: 20px;
      }

      .router-page {
        width: 100%;
        margin-top: 25px;
      }

      .chart-card {
        background: white;

        padding: 22px;

        border-radius: 22px;

        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
      }

      .chart-card h3 {
        margin-bottom: 15px;
        color: #0f172a;
        font-size: 20px;
      }

      canvas {
        width: 100% !important;
        max-height: 330px !important;
      }

      /* MOBILE */

      @media (max-width: 768px) {
        .dashboard {
          flex-direction: column;
        }

        .sidebar {
          width: 100%;
          height: auto;

          position: relative;

          border-radius: 0;

          padding: 12px;

          overflow-x: auto;
        }

        .logo-box {
          display: none;
        }

        .menu {
          flex-direction: row;

          gap: 10px;

          overflow-x: auto;

          padding-bottom: 8px;
        }

        .sidebar a {
          min-width: max-content;

          padding: 12px 16px;

          font-size: 14px;

          background: rgba(255, 255, 255, 0.06);
        }

        .logout-btn {
          width: 100%;
          margin-top: 10px;
        }

        .content {
          padding: 14px;
        }

        .cards {
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .charts {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 480px) {
        .cards {
          grid-template-columns: 1fr;
        }

        .sidebar a span {
          display: none;
        }

        .sidebar a {
          justify-content: center;
          min-width: 56px;
          font-size: 20px;
        }
      }
    `,
  ],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('citasCanvas')
  citasCanvas!: ElementRef;

  @ViewChild('serviciosCanvas')
  serviciosCanvas!: ElementRef;

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
      this.clientes = res.member || res;
    });

    this.api.getCitas().subscribe((res: any) => {
      this.citas = res.member || res;

      setTimeout(() => {
        this.createCitasChart();
      }, 100);
    });

    this.api.getServicios().subscribe((res: any) => {
      this.servicios = res.member || res;

      setTimeout(() => {
        this.createServiciosChart();
      }, 100);
    });

    this.api.getFacturas().subscribe((res: any) => {
      this.facturas = res.member || res;
    });
  }

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

            backgroundColor: ['#210954', '#1188f0'],

            borderWidth: 2,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
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

            backgroundColor: '#1c082c',

            borderRadius: 10,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  logout() {
    localStorage.removeItem('token');

    location.href = '/login';
  }
}
