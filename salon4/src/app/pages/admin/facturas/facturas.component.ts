import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import jsPDF from 'jspdf';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h2>Facturas</h2>

      <table *ngIf="facturas.length > 0">
        <thead>
          <tr>
            <th>Código</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let f of facturas">
            <td>{{ f.codigo_factura }}</td>

            <!-- ✅ FIX CLIENTE -->
            <td>{{ f.cliente_nombre }}</td>

            <td>{{ getTotal(f).toFixed(2) }}€</td>

            <td>
              <button class="view" (click)="open(f)">👁️</button>
              <button class="delete" (click)="delete(f)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="facturas.length === 0">No hay facturas aún</p>

      <!-- MODAL -->
      <div class="modal" *ngIf="selected">
        <div class="factura">
          <h2>Factura</h2>

          <p>
            <b>Nº:</b>
            {{ selected.codigo_factura }}
          </p>

          <!-- ✅ FIX CLIENTE -->
          <p>
            <b>Cliente:</b>
            {{ selected.cliente_nombre }}
          </p>

          <div class="actions">
            <button class="download" (click)="downloadPDF()">⬇ Descargar PDF</button>

            <button class="close" (click)="close()">Cerrar</button>
          </div>
        </div>
      </div>
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

      h2 {
        margin-bottom: 24px;

        font-size: 28px;
        font-weight: 700;

        color: #0f172a;
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

      /* BUTTONS */

      .view,
      .delete {
        border: none;

        width: 40px;
        height: 40px;

        border-radius: 10px;

        color: white;

        cursor: pointer;

        font-size: 15px;

        transition: 0.25s;
      }

      .view {
        background: linear-gradient(135deg, #2563eb, #1d4ed8);

        margin-right: 6px;
      }

      .delete {
        background: linear-gradient(135deg, #ef4444, #dc2626);
      }

      .view:hover,
      .delete:hover {
        transform: scale(1.05);
      }

      /* EMPTY */

      p {
        color: #64748b;
        font-size: 15px;
      }

      /* MODAL */

      .modal {
        position: fixed;
        inset: 0;

        background: rgba(15, 23, 42, 0.6);

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 15px;

        z-index: 999;
      }

      .factura {
        background: white;

        padding: 26px;

        border-radius: 22px;

        width: 100%;
        max-width: 500px;

        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);

        animation: fadeIn 0.25s ease;
      }

      .factura h2 {
        margin-bottom: 20px;

        color: #0f172a;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .factura p {
        margin: 12px 0;

        color: #334155;

        font-size: 15px;
      }

      .factura b {
        color: #0f172a;
      }

      /* ACTIONS */

      .actions {
        display: flex;

        gap: 12px;

        margin-top: 24px;

        flex-wrap: wrap;
      }

      .download,
      .close {
        flex: 1;

        border: none;

        padding: 13px 16px;

        border-radius: 12px;

        cursor: pointer;

        color: white;

        font-size: 14px;
        font-weight: 600;

        transition: 0.25s;
      }

      .download {
        background: linear-gradient(135deg, #2563eb, #4f46e5);
      }

      .close {
        background: linear-gradient(135deg, #64748b, #475569);
      }

      .download:hover,
      .close:hover {
        transform: translateY(-2px);
        opacity: 0.95;
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
          content: 'Código';
        }

        td:nth-child(2)::before {
          content: 'Cliente';
        }

        td:nth-child(3)::before {
          content: 'Total';
        }

        td:nth-child(4)::before {
          content: 'Acciones';
        }

        .factura {
          max-width: 100%;
        }

        .actions {
          flex-direction: column;
        }

        .download,
        .close {
          width: 100%;
        }
      }

      /* SMALL MOBILE */

      @media (max-width: 480px) {
        h2 {
          font-size: 22px;
        }

        td {
          flex-direction: column;
          align-items: flex-start;
        }

        td::before {
          margin-bottom: 4px;
        }

        .factura {
          padding: 20px;
        }
      }
    `,
  ],
})
export class FacturasComponent implements OnInit {
  facturas: any[] = [];
  selected: any = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadFacturas();
  }

  // ✅ LOAD FACTURAS FINAL FIX
  loadFacturas() {
    this.api.getFacturas().subscribe({
      next: (resFacturas: any) => {
        const facturasData = resFacturas.member || [];

        this.api.getClientes().subscribe({
          next: (resClientes: any) => {
            const clientes = resClientes.member || [];

            this.api.getServicios().subscribe({
              next: (resServicios: any) => {
                const servicios = resServicios.member || [];

                this.api.getDetalleFacturas().subscribe({
                  next: (resDetalles: any) => {
                    const detalles = resDetalles.member || [];

                    this.facturas = facturasData.map((f: any) => {
                      // =====================
                      // CLIENTE
                      // =====================

                      const cliente = clientes.find((c: any) => c['@id'] === f.cliente);

                      // =====================
                      // DETAILS
                      // =====================

                      const detallesFactura = detalles
                        .filter((d: any) => d.factura === f['@id'])
                        .map((d: any) => {
                          const servicio = servicios.find((s: any) => s['@id'] === d.servicio);

                          return {
                            ...d,

                            servicio,
                          };
                        });

                      return {
                        ...f,

                        // ✅ CLIENT NAME
                        cliente_nombre: cliente?.nombre || 'Cliente',

                        // ✅ DETAILS
                        detalle_facturas: detallesFactura,
                      };
                    });

                    console.log('FACTURAS FINAL', this.facturas);
                  },
                });
              },
            });
          },
        });
      },
    });
  }

  open(f: any) {
    this.selected = f;
  }

  close() {
    this.selected = null;
  }

  /* delete(f: any) {
    this.api.deleteFactura(f.id).subscribe(() => {
      this.loadFacturas();
    });
  }
    */
  delete(f: any) {
    if (!confirm('Supprimer cette facture ?')) {
      return;
    }

    // 🔥 جيب التفاصيل المرتبطة بالفاتورة
    const detalles = f.detalle_facturas || [];

    // 🔥 إذا ماكان حتى detail
    if (detalles.length === 0) {
      this.deleteFacturaFinal(f);
      return;
    }

    // 🔥 حذف details الأول
    let deleted = 0;

    detalles.forEach((d: any) => {
      this.api.deleteDetalleFactura(d.id).subscribe({
        next: () => {
          deleted++;

          // 🔥 من بعد نحذف facture
          if (deleted === detalles.length) {
            this.deleteFacturaFinal(f);
          }
        },

        error: (err) => {
          console.error(err);
        },
      });
    });
  }
  //Delete DetalleFactura
  deleteFacturaFinal(f: any) {
    this.api.deleteFactura(f.id).subscribe({
      next: () => {
        // ✅ حذف من table مباشرة
        this.facturas = this.facturas.filter((x) => x.id !== f.id);

        // ✅ سد المودال إذا مفتوحة
        if (this.selected?.id === f.id) {
          this.selected = null;
        }
      },

      error: (err) => {
        console.error(err);
        alert('Erreur suppression facture');
      },
    });
  }

  // ✅ SUBTOTAL
  getSubtotal(f: any) {
    if (!f.detalle_facturas) {
      return 0;
    }

    return f.detalle_facturas.reduce(
      (sum: number, d: any) => sum + Number(d.precio) * Number(d.cantidad),
      0,
    );
  }

  // ✅ IVA
  getIVA(f: any) {
    return this.getSubtotal(f) * 0.21;
  }

  // ✅ TOTAL
  getTotal(f: any) {
    return this.getSubtotal(f) + this.getIVA(f);
  }

  // ✅ PDF FINAL PRO
  downloadPDF() {
    const f = this.selected;

    const pdf = new jsPDF();

    // =====================
    // LOGO
    // =====================

    const logo = new Image();

    logo.src = '/images/logo.png';

    logo.onload = () => {
      // =====================
      // LOGO IMAGE
      // =====================

      pdf.addImage(logo, 'PNG', 14, 10, 30, 30);

      // =====================
      // HEADER
      // =====================

      pdf.setFontSize(24);

      pdf.text('SALON PREMIUM', 50, 20);

      pdf.setFontSize(11);

      pdf.text('Diego Lainez, 10', 50, 30);

      pdf.text('Palencia, España', 50, 36);

      pdf.text('Tel: +34 600000000', 50, 42);

      pdf.text('Email: salon@gmail.com', 50, 48);

      // =====================
      // LINE
      // =====================

      pdf.setDrawColor(180);

      pdf.line(14, 58, 196, 58);

      // =====================
      // FACTURA INFO
      // =====================

      pdf.setFontSize(12);

      pdf.text(`Factura: ${f.codigo_factura}`, 130, 20);

      pdf.text(`Fecha: ${f.fecha_factura.substring(0, 10)}`, 130, 28);

      pdf.text(`Hora: ${new Date(f.fecha_factura).toLocaleTimeString()}`, 130, 36);

      // =====================
      // CLIENTE
      // =====================

      let y = 75;

      pdf.setFontSize(15);

      pdf.text(`Cliente: ${f.cliente_nombre}`, 14, y);

      y += 18;

      // =====================
      // TABLE HEADER
      // =====================

      pdf.setFillColor(20, 20, 20);

      pdf.roundedRect(14, y, 182, 10, 2, 2, 'F');

      pdf.setTextColor(255, 255, 255);

      pdf.setFontSize(12);

      pdf.text('Servicio', 20, y + 7);

      pdf.text('Precio', 160, y + 7);

      y += 15;

      // =====================
      // TABLE BODY
      // =====================

      pdf.setTextColor(0, 0, 0);

      pdf.setFontSize(12);

      f.detalle_facturas.forEach((d: any) => {
        pdf.text(d.servicio?.nombre_servicio || 'Servicio', 20, y);

        pdf.text(`${Number(d.precio).toFixed(2)}€`, 160, y);

        // LINE ROW
        pdf.setDrawColor(230);

        pdf.line(20, y + 3, 180, y + 3);

        y += 12;
      });

      // =====================
      // TOTALS BOX
      // =====================

      const subtotal = this.getSubtotal(f);

      const iva = this.getIVA(f);

      const total = this.getTotal(f);

      y += 10;

      pdf.setFillColor(245, 245, 245);

      pdf.roundedRect(120, y, 70, 35, 3, 3, 'F');

      y += 10;

      pdf.setFontSize(11);

      pdf.text(`Subtotal: ${subtotal.toFixed(2)}€`, 130, y);

      y += 8;

      pdf.text(`IVA (21%): ${iva.toFixed(2)}€`, 130, y);

      y += 10;

      pdf.setFontSize(18);

      pdf.text(`TOTAL: ${total.toFixed(2)}€`, 128, y);

      // =====================
      // FOOTER
      // =====================

      pdf.setDrawColor(180);

      pdf.line(14, 270, 196, 270);

      pdf.setFontSize(10);

      pdf.setTextColor(120);

      pdf.text('Gracias por confiar en Salon Premium', 14, 278);

      pdf.text('www.salonpremium.com', 145, 278);

      // =====================
      // SAVE PDF
      // =====================

      pdf.save(`${f.codigo_factura}.pdf`);
    };
  }
}
