import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="page">
      <div class="header">
        <h2>Citas</h2>
        <button class="add-btn" (click)="add()">+ Nueva cita</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let c of citas">
            <td>{{ c.cliente_nombre }}</td>
            <td>{{ c.servicio_nombre }}</td>

            <td>{{ c.fecha_cita | date: 'yyyy-MM-dd' }}</td>

            <td>
              <span class="time">
                {{ c.hora_cita?.substring(0, 5) }}
              </span>
            </td>

            <td>
              <span class="status" [ngClass]="c.estado">
                {{ c.estado }}
              </span>
            </td>

            <td>
              <button class="confirm" (click)="confirmar(c)">✔</button>
              <button class="delete" (click)="delete(c)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      * {
        box-sizing: border-box;
      }

      .page {
        padding: 24px;
        background: #eef2f7;
        min-height: 100vh;
      }

      /* HEADER */

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        gap: 15px;
        flex-wrap: wrap;
      }

      h2 {
        font-size: 28px;
        color: #0f172a;
        margin: 0;
        font-weight: 700;
      }

      .add-btn {
        background: linear-gradient(135deg, #2563eb, #4f46e5);

        color: white;
        border: none;

        padding: 12px 20px;

        border-radius: 12px;

        cursor: pointer;

        font-weight: 600;
        font-size: 14px;

        transition: 0.25s;
      }

      .add-btn:hover {
        transform: translateY(-2px);
        opacity: 0.95;
      }

      /* TABLE */

      table {
        width: 100%;

        border-collapse: collapse;

        background: white;

        border-radius: 20px;

        overflow: hidden;

        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);
      }

      thead {
        background: linear-gradient(90deg, #0f172a, #1e293b);
      }

      th {
        color: white;
        padding: 18px;
        text-align: left;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      td {
        padding: 16px 18px;
        border-bottom: 1px solid #edf2f7;
        color: #334155;
        font-size: 14px;
      }

      tbody tr {
        transition: 0.2s;
      }

      tbody tr:hover {
        background: #f8fafc;
      }

      /* TIME */

      .time {
        background: #0f172a;
        color: white;

        padding: 6px 12px;

        border-radius: 10px;

        font-size: 12px;
        font-weight: 600;
      }

      /* STATUS */

      .status {
        padding: 6px 12px;

        border-radius: 30px;

        color: white;

        font-size: 12px;
        font-weight: bold;

        text-transform: capitalize;
      }

      .confirmada {
        background: linear-gradient(135deg, #22c55e, #16a34a);
      }

      .pendiente {
        background: linear-gradient(135deg, #f59e0b, #ea580c);
      }

      /* BUTTONS */

      .confirm,
      .delete {
        border: none;

        width: 38px;
        height: 38px;

        border-radius: 10px;

        cursor: pointer;

        color: white;

        font-size: 15px;

        transition: 0.25s;
      }

      .confirm {
        background: linear-gradient(135deg, #22c55e, #16a34a);

        margin-right: 6px;
      }

      .delete {
        background: linear-gradient(135deg, #ef4444, #dc2626);
      }

      .confirm:hover,
      .delete:hover {
        transform: scale(1.05);
      }

      /* MOBILE */

      @media (max-width: 900px) {
        .page {
          padding: 14px;
        }

        table,
        tbody,
        tr,
        td {
          display: block;
          width: 100%;
        }

        thead {
          display: none;
        }

        tr {
          background: white;

          margin-bottom: 18px;

          border-radius: 18px;

          padding: 16px;

          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
        }

        td {
          border: none;

          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 10px;

          padding: 12px 0;

          font-size: 14px;
        }

        td::before {
          font-weight: 700;
          color: #0f172a;
        }

        td:nth-child(1)::before {
          content: 'Cliente';
        }

        td:nth-child(2)::before {
          content: 'Servicio';
        }

        td:nth-child(3)::before {
          content: 'Fecha';
        }

        td:nth-child(4)::before {
          content: 'Hora';
        }

        td:nth-child(5)::before {
          content: 'Estado';
        }

        td:nth-child(6)::before {
          content: 'Acciones';
        }

        .confirm,
        .delete {
          width: 42px;
          height: 42px;
        }
      }

      /* SMALL MOBILE */

      @media (max-width: 480px) {
        h2 {
          font-size: 22px;
        }

        .header {
          flex-direction: column;
          align-items: stretch;
        }

        .add-btn {
          width: 100%;
        }

        td {
          flex-direction: column;
          align-items: flex-start;
        }

        td::before {
          margin-bottom: 4px;
        }
      }
    `,
  ],
})
export class CitasComponent implements OnInit {
  citas: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCitas();
  }

  // 🔥 LOAD FINAL FIX
  // 🔥 LOAD FINAL WORKING
  loadCitas() {
    this.api.getCitas().subscribe({
      next: (res: any) => {
        const citasData = res.member || [];

        this.api.getClientes().subscribe({
          next: (resClientes: any) => {
            const clientes = resClientes.member || [];

            this.api.getServicios().subscribe({
              next: (resServicios: any) => {
                const servicios = resServicios.member || [];

                this.citas = citasData.map((c: any) => {
                  // ======================
                  // CLIENTE
                  // ======================

                  //const cliente = clientes.find((cl: any) => cl['@id'] === c.cliente);
                  /*const cliente = clientes.find((cl: any) => {
                    const clienteId =
                      typeof c.cliente === 'string'
                        ? Number(c.cliente.split('/').pop())
                        : c.cliente;

                    return cl.id === clienteId;
                  });*/
                  // ======================
                  // CLIENTE
                  // ======================

                  /* const cliente = clientes.find((cl: any) => {
                    const clienteId = Number(String(c.cliente).split('/').pop());

                    return Number(cl.id) === clienteId;
                  });

                  console.log('CLIENTE CITA 👉', c.cliente);

                  console.log('CLIENTE FOUND 👉', cliente);
                  */
                  // ======================
                  // CLIENTE
                  // ======================

                  let clienteNombre = 'Cliente';

                  const clienteId = c.cliente.replace('/api/clientes/', '');

                  const clienteEncontrado = clientes.find((cl: any) => {
                    return String(cl.id) === String(clienteId);
                  });

                  if (clienteEncontrado) {
                    clienteNombre = clienteEncontrado.nombre;
                  }

                  console.log('CLIENTE ID 👉', clienteId);
                  console.log('CLIENTE ENCONTRADO 👉', clienteEncontrado);
                  // ======================
                  // SERVICIO
                  // ======================

                  let servicioNombre = 'Servicio';

                  if (c.servicios && c.servicios.length > 0) {
                    const servicioId = c.servicios[0]['@id'];

                    const servicio = servicios.find((s: any) => s['@id'] === servicioId);

                    if (servicio) {
                      servicioNombre = servicio.nombre_servicio;
                    }
                  }

                  return {
                    ...c,

                    // CLIENTE REAL
                    //cliente_nombre: cliente?.nombre || 'Cliente',
                    // cliente_nombre: c.cliente?.nombre || cliente?.nombre || 'Cliente',
                    cliente_nombre: clienteNombre,
                    // SERVICIO REAL
                    servicio_nombre: servicioNombre,

                    // FECHA
                    fecha_cita: c.fecha_cita.substring(0, 10),

                    // HORA
                    hora_cita: c.hora_cita.substring(11, 16),
                  };
                });

                console.log(this.citas);
              },
            });
          },
        });
      },
    });
  }

  //confirmar
  /*confirmar(c: any) {
    this.api.updateCita(c.id, { estado: 'confirmada' }).subscribe(() => {
      c.estado = 'confirmada';
    });
  }
    */
  confirmar(c: any) {
    // إذا déjà confirmada
    if (c.estado === 'confirmada') {
      return;
    }

    // =====================
    // CONFIRM CITA
    // =====================

    this.api
      .updateCita(c.id, {
        estado: 'confirmada',
      })
      .subscribe(() => {
        c.estado = 'confirmada';

        // =====================
        // CREATE FACTURA
        // =====================

        const facturaData = {
          cliente: c.cliente,

          admin: '/api/admins/1',

          codigo_factura: 'FAC-' + Date.now(),

          fecha_factura: new Date().toISOString(),
        };

        this.api.addFactura(facturaData).subscribe((factura: any) => {
          // =====================
          // CREATE DETALLE
          // =====================

          if (c.servicios?.length > 0) {
            c.servicios.forEach((servicio: any) => {
              this.api.getServicios().subscribe((res: any) => {
                const servicios = res.member || [];

                const servicioCompleto = servicios.find((s: any) => s['@id'] === servicio['@id']);

                if (servicioCompleto) {
                  const detalle = {
                    factura: factura['@id'],

                    servicio: servicioCompleto['@id'],

                    cantidad: 1,

                    precio: servicioCompleto.costo,
                  };

                  this.api.addDetalleFactura(detalle).subscribe(() => {
                    console.log('FACTURA CREATED');
                  });
                }
              });
            });
          }
        });
      });
  }
  //Delete
  delete(c: any) {
    this.api.deleteCita(c.id).subscribe(() => {
      this.citas = this.citas.filter((x) => x.id !== c.id);
    });
  }

  add() {
    const now = new Date();

    const data = {
      cliente: '/api/clientes/1',
      admin: '/api/admins/1',
      fecha_cita: now.toISOString(),
      hora_cita: '10:00:00',
      estado: 'pendiente',
      fecha_solicitud: now.toISOString(),
      servicios: ['/api/servicios/1'], // 🔥 مهم
    };

    this.api.addCita(data).subscribe(() => this.loadCitas());
  }
}
