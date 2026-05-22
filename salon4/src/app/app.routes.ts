import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // PUBLIC
  {
    path: '',
    loadComponent: () => import('./pages/public/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./pages/public/servicios/servicios.component').then((m) => m.ServiciosComponent),
  },
  {
    path: 'reservar-cita',
    loadComponent: () =>
      import('./pages/public/reservar-cita/reservar-cita.component').then(
        (m) => m.ReservarCitaComponent,
      ),
  },

  // AUTH
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
  },

  // 🔥 ADMIN (محمي + children)
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),

    children: [
      {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full',
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./pages/admin/clientes/clientes.component').then((m) => m.ClientesComponent),
      },
      {
        path: 'citas',
        loadComponent: () =>
          import('./pages/admin/citas/citas.component').then((m) => m.CitasComponent),
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./pages/admin/servicios/servicios.component').then((m) => m.ServiciosComponent),
      },
      {
        path: 'facturas',
        loadComponent: () =>
          import('./pages/admin/facturas/facturas.component').then((m) => m.FacturasComponent),
      },
    ],
  },
];
