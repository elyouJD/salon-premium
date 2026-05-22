import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminDataService {
  // 👤 CLIENTES
  clientes = [
    {
      id: 1,
      nombre: 'Ali',
      email: 'ali@email.com',
      telefono: '0600000000',
      genero: 'Hombre',
      direccion: 'Madrid, España',
    },
  ];

  // 🧾 SERVICIOS
  servicios = [
    {
      id: 1,
      nombre: 'Corte',
      precio: 10,
      descripcion: 'Corte moderno',
      img: 'images/img1.jpg',
    },
    {
      id: 2,
      nombre: 'Barba',
      precio: 5,
      descripcion: 'Arreglo de barba',
      img: 'images/img2.jpg',
    },
  ];

  // 📅 CITAS
  citas = [
    {
      id: 1,
      cliente: 'Ali',
      servicio: 'Corte',
      fecha: '2026-05-01',
      hora: '10:00',
      estado: 'pendiente',
    },
  ];

  // 🧾 FACTURAS
  facturas: any[] = [];

  // ---------------------------
  // 👤 CLIENTES
  // ---------------------------

  addCliente(c: any) {
    c.id = Date.now();
    this.clientes.push(c);
  }

  deleteCliente(i: number) {
    this.clientes.splice(i, 1);
  }

  // ---------------------------
  // 🧾 SERVICIOS
  // ---------------------------

  addServicio(s: any) {
    s.id = Date.now();
    this.servicios.push(s);
  }

  updateServicio(i: number, data: any) {
    this.servicios[i] = data;
  }

  deleteServicio(i: number) {
    this.servicios.splice(i, 1);
  }

  // ---------------------------
  // 📅 CITAS
  // ---------------------------

  confirmarCita(i: number) {
    const cita = this.citas[i];
    cita.estado = 'confirmada';

    // 🔍 نجيب العميل
    const cliente = this.clientes.find((c) => c.nombre === cita.cliente);

    // 🔍 نجيب الخدمة
    const servicio = this.servicios.find((s) => s.nombre === cita.servicio);

    const precio = servicio ? servicio.precio : 0;

    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString();
    const horaFormateada = fecha.toLocaleTimeString();

    const iva = 0.21;

    // 🔥 CREATE FACTURA PRO
    this.facturas.push({
      id: Date.now(),
      codigo: 'FAC-' + Date.now(),

      cliente: cita.cliente,
      telefono: cliente?.telefono || '',
      direccion: cliente?.direccion || 'No definida',

      fecha: fechaFormateada,
      hora: horaFormateada,

      servicios: [
        {
          nombre: servicio?.nombre || 'Servicio',
          precio: precio,
        },
      ],

      iva: iva,
    });
  }

  deleteCita(i: number) {
    this.citas.splice(i, 1);
  }

  // ---------------------------
  // 🧾 FACTURAS
  // ---------------------------

  deleteFactura(i: number) {
    this.facturas.splice(i, 1);
  }
}
