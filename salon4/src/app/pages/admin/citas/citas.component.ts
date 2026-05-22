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
      .page {
        padding: 25px;
        background: #f4f6f9;
      }
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
      }
      h2 {
        font-size: 24px;
      }

      .add-btn {
        background: linear-gradient(135deg, #ff7a18, #ff512f);
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 10px;
        cursor: pointer;
      }

      table {
        width: 100%;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      }

      th {
        background: #111;
        color: white;
        padding: 15px;
      }

      td {
        padding: 14px;
        border-bottom: 1px solid #eee;
      }

      .time {
        background: #111;
        color: white;
        padding: 5px 10px;
        border-radius: 8px;
      }

      .status {
        padding: 5px 10px;
        border-radius: 10px;
        color: white;
        font-size: 12px;
      }

      .confirmada {
        background: green;
      }
      .pendiente {
        background: orange;
      }

      .confirm,
      .delete {
        border: none;
        padding: 6px 10px;
        border-radius: 6px;
        cursor: pointer;
        color: white;
      }

      .confirm {
        background: green;
        margin-right: 5px;
      }
      .delete {
        background: red;
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
