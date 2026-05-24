import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservar-cita.html',
  styleUrls: ['./reservar-cita.css'],
})
export class ReservarCitaComponent implements OnInit {
  servicios: any[] = [];
  clientes: any[] = [];
  citas: any[] = [];

  horarios = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];

  horariosReservados: string[] = [];

  cita = {
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    fecha: '',
    hora: '',
  };

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) {}

  // =========================
  // INIT
  // =========================

  ngOnInit() {
    this.loadData();

    this.route.queryParams.subscribe((params) => {
      if (params['servicio']) {
        this.cita.servicio = params['servicio'];
      }
    });
  }

  // =========================
  // LOAD DATA
  // =========================

  loadData() {
    // SERVICIOS
    this.api.getServicios().subscribe({
      next: (res: any) => {
        this.servicios = res['hydra:member'] || res.member || [];
      },

      error: (err) => {
        console.log('ERROR SERVICIOS ❌', err);
      },
    });

    // CLIENTES
    this.api.getClientes().subscribe({
      next: (res: any) => {
        this.clientes = res['hydra:member'] || res.member || [];

        console.log('CLIENTES 👉', this.clientes);
      },

      error: (err) => {
        console.log('ERROR CLIENTES ❌', err);
      },
    });

    // CITAS
    this.api.getCitas().subscribe({
      next: (res: any) => {
        this.citas = res['hydra:member'] || res.member || [];

        this.loadHorasReservadas();
      },

      error: (err) => {
        console.log('ERROR CITAS ❌', err);
      },
    });
  }

  // =========================
  // LOAD RESERVED HOURS
  // =========================

  loadHorasReservadas() {
    this.horariosReservados = [];

    if (!this.cita.fecha) return;

    // 🔥 جلب citas مباشرة من API
    this.api.getCitas().subscribe((res: any) => {
      const citas = res.member || [];

      citas.forEach((c: any) => {
        // تاريخ cita
        const fechaApi = c.fecha_cita.substring(0, 10);

        console.log('HORA API 👉', c.hora_cita);
        // ساعة cita
        const horaApi = String(c.hora_cita).substring(11, 16);

        // نفس التاريخ
        if (fechaApi === this.cita.fecha) {
          this.horariosReservados.push(horaApi);
        }
      });

      console.log('HORAS RESERVADAS 👉', this.horariosReservados);
    });
  }

  // =========================
  // CHECK RESERVED
  // =========================
  estaReservado(hora: string): boolean {
    console.log('CHECK HORA 👉', hora);

    console.log('RESERVADAS 👉', this.horariosReservados);

    return this.horariosReservados.includes(hora);
  }

  // =========================
  // FILTER PAST HOURS
  // =========================

  getHorariosDisponibles() {
    // إذا ماختارش تاريخ
    if (!this.cita.fecha) {
      return this.horarios;
    }

    const hoy = new Date();

    const fechaHoy = hoy.toISOString().split('T')[0];

    // إذا التاريخ ماشي اليوم
    if (this.cita.fecha !== fechaHoy) {
      return this.horarios;
    }

    // الوقت الحالي
    const horaActual = hoy.getHours();

    return this.horarios.filter((h: string) => {
      const hora = Number(h.split(':')[0]);

      // نخلي الساعة الحالية ومافوق
      return hora >= horaActual;
    });
  }
  // =========================
  // SELECT HOUR
  // =========================

  seleccionarHora(hora: string) {
    if (this.estaReservado(hora)) {
      return;
    }

    this.cita.hora = hora;
  }

  // =========================
  // SUBMIT
  // =========================

  submit() {
    // SERVICE
    if (!this.cita.servicio) {
      alert('⚠️ Selecciona un servicio');

      return;
    }

    const servicio = this.servicios.find((s: any) => s.nombre_servicio == this.cita.servicio);

    // DATE
    if (!this.cita.fecha) {
      alert('⚠️ Selecciona una fecha');

      return;
    }

    // HOUR
    if (!this.cita.hora) {
      alert('⚠️ Selecciona una hora');

      return;
    }

    // RESERVED
    if (this.estaReservado(this.cita.hora)) {
      alert('❌ Hora ya reservada');

      return;
    }

    // FIND CLIENT
    let cliente = this.clientes.find(
      (c: any) => c.email.toLowerCase() === this.cita.email.toLowerCase(),
    );

    // =========================
    // CLIENT NOT FOUND
    // =========================

    if (!cliente) {
      const nuevoCliente = {
        nombre: this.cita.nombre,

        email: this.cita.email,

        telefono: this.cita.telefono,

        genero: 'Hombre',

        detalles: 'Cliente Web',

        fecha_creacion: new Date().toISOString(),

        fecha_actualizacion: new Date().toISOString(),
      };

      // CREATE CLIENT
      this.api.addCliente(nuevoCliente).subscribe({
        next: (newClient: any) => {
          console.log('CLIENT CREATED ✅', newClient);

          // ADD TO ARRAY DIRECTLY
          this.clientes.push(newClient);

          // CREATE CITA
          this.crearCita(newClient, servicio);
        },

        error: (err) => {
          console.log(err);

          alert('Error creando cliente');
        },
      });

      return;
    }

    // =========================
    // CLIENT EXISTS
    // =========================

    this.crearCita(cliente, servicio);
  }
  // =========================
  // CREATE CITA
  // =========================

  crearCita(cliente: any, servicio: any) {
    const clienteId = cliente.id || cliente['@id']?.split('/').pop();

    const data = {
      cliente: `/api/clientes/${clienteId}`,

      admin: '/api/admins/1',

      fecha_cita: this.cita.fecha + 'T00:00:00',

      hora_cita: this.cita.hora + ':00',

      estado: 'pendiente',

      fecha_solicitud: new Date().toISOString(),

      servicios: [`/api/servicios/${servicio.id}`],
    };

    console.log('DATA SENT 👉', data);

    this.api.addCita(data).subscribe({
      next: () => {
        alert('✅ Cita creada correctamente');

        this.loadData();

        this.horariosReservados.push(this.cita.hora);

        this.cita = {
          nombre: '',
          email: '',
          telefono: '',
          servicio: '',
          fecha: '',
          hora: '',
        };
      },

      error: (err: any) => {
        console.log(err);

        alert('Error backend');
      },
    });
  }
}
